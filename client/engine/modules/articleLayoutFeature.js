import { getNodeStyle, layoutVerticalList } from "../constants/layoutConstants.js"
import { parseArticle } from "../constants/layoutParser.js"
import { matchesOrderedPrefix, normalize } from "./search.js"

export class ArticleLayoutFeature {
    constructor(engine) {
        this.layout = null
        this.engine = engine
        this._unsubscribe = []
        this._lastFilter = ''
    }
    contextExports() {
        return {
            applyArticleFilter: this.applyFilter.bind(this),
            layoutArticles: this.layoutArticles.bind(this),
            getArticleLayoutFeature: () => this,
        }
    }
    attach() {
        this.layout = this.engine.context.getLayoutManager()
        this._unsubscribe.push(this.engine.on('searchChanged', (searchTerm) => {
            this.applyFilter(searchTerm)
        }))
    }

    detach() {
        this._unsubscribe.forEach(unsub => unsub())
        this._unsubscribe = []
    }

    getArticleNodes() {
        return this.layout.nodeQuery.getArticles()
    }

    getSearchBarNode() {
        return this.layout.nodeQuery.getSearchBar()
    }

   applyFilter(searchTerm) {

    console.log(
        'ArticleLayoutFeature: applyFilter called with searchTerm:',
        searchTerm
    )

    const normalized = normalize(searchTerm)

    if (normalized === this._lastFilter) return
    this._lastFilter = normalized

    const filtered = this.getArticleNodes().filter(node =>
        matchesOrderedPrefix(
            node.props?.title || '',
            normalized
        )
    )

    const state =
        this.engine.context.getInteractionState()

          // clear invalid selection
    if (
        state.selectedNodeId &&
        !filtered.some(
            node => node.id === state.selectedNodeId
        )
    ) {
        this.engine.context.clearSelectedArticle()
    }

    this.layoutArticles(filtered, state)
}

    layoutArticles(articleNodes = null, state) {
        articleNodes ??= this.getArticleNodes()

        if (state.view === 'list') {
            this.layoutArticlesList(articleNodes)
        } else {
          
            const selected = articleNodes.find(
                node => node.id === state.selectedNodeId
            ) 
            
            this.layoutArticlesDetail(selected)
        }

        this.engine.emit('layoutChanged', { layout: this.layout.layoutNodes })
    }

    layoutArticlesList(articleNodes) {
        const startY = this.layout.height / 8
        const spacingY = 30

for (const [id, rect] of this.layout.layoutNodes) {
        if (rect.kind === 'article') {
            this.layout.layoutNodes.delete(id)
        }
    }
    
        const rects = layoutVerticalList(articleNodes, {
            startX: Math.max(this.layout.width / 8, 20),
            startY,
            spacing: spacingY,
            getItemHeight: (node) => {
                const { height } = this.getArticleCardSize(node)
                return height
            },
            create: (node, worldY, startX) => {
                const {  color } = getNodeStyle(node)

const thumbnail = node.props?.articleData?.photo 

const { width, height, thumbnailSize } = this.getArticleCardSize(node)
                return {
                    id: node.id,
                    articleId: node.props?.articleData?.articleId || null,
                    x: startX,
                    width,
                    height,
                    color,
                    thumbnail,
                    thumbnailSize,
                    selected: false,
                    text: node.props?.title || 'article',
                    content: node.props?.articleData?.content || '',
                   
                   excerpt: node.props?.articleData?.excerpt || ''
                   || node.props?.articleData?.article?.substring(0, 100) || '',
                    type: 'text',
                    kind: 'article',
                    worldY
                }
            }
        })

        for (const [id, rect] of rects.entries()) {
            this.layout.layoutNodes.set(id, rect)
        }

        this.layout.computeScrollBounds(rects)
    }

    layoutArticlesDetail(articleNode) {
        if (!articleNode) return

        const padding = 20
        const x = this.layout.width / 8
        const worldY = this.layout.height / 8
        const width = Math.min(this.layout.width * 0.75, 600)
const color = articleNode?.props?.color || '#ffffff'
      

            const lesson = parseArticle(articleNode)

//console.log(lesson)
let currentY = worldY 

const titleHeight = 50

this.layout.layoutNodes.set(`${articleNode.id}-title`, {
    id: `${articleNode.id}-title`,
    x,
    worldY: currentY,
    width,
    height: titleHeight,
    color,
    text: lesson.title,
    kind: 'lessonTitle',
    type: 'text',
    padding
})

currentY += titleHeight + 20

lesson.sections.forEach((section, index) => {
    if(section.type === 'heading'){
        const headingHeight = 30
        const headingRect = {
            id: `${articleNode.id}-${index}`,
            x,
            worldY: currentY,
            width,
            height: headingHeight,
            padding,
            color: color,
            selected: false,
            text: section.text,
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'heading'
        }
        this.layout.layoutNodes.set(headingRect.id, headingRect)
        currentY += headingHeight + 10
    } else if(section.type === 'paragraph'){
        const paragraphHeight = this.measureParagraphText(section.text, width - padding * 2)
        const paragraphRect = { 
            id: `${articleNode.id}-${index}`,
            x,
            worldY: currentY,
            width,
            height: paragraphHeight,
            padding,
            color: '#f0f0f0',
            selected: false,
            text: section.text,
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'paragraph'
        }

        this.layout.layoutNodes.set(paragraphRect.id, paragraphRect)
        currentY += paragraphHeight + 10
    }  else if(section.type === 'quiz'){
            const questionHeight = 30
const optionHeight = 30

const quizHeight =
    padding * 2 +
    questionHeight +
    section.options.length * optionHeight
            const quizRect = {
                id: `${articleNode.id}-${index}`,
                x,
                worldY: currentY,
                width,
                height: quizHeight,
                padding,
                color: '#e0e0e0',
                selected: false,
                question: section.question,
                type: 'quiz',
                kind: 'lessonSection',
                sectionType: 'quiz',
                options: section.options,
                answer: section.answer,
                quizId: `${lesson.id}-${index}`
            }
            this.layout.layoutNodes.set(quizRect.id, quizRect)
            currentY += quizHeight + 10

            for (let i = 0; i < section.options.length; i++) {
                const optionRect = {
                    id: `${articleNode.id}-${index}-option-${i}`,
                    x: x + padding,
                    worldY: currentY - quizHeight + padding + questionHeight + i * optionHeight,
                    width: width - padding * 2,
                    height: optionHeight,
                    padding,
                    color: '#d0d0d0',
                    selected: false,
                    text: section.options[i],
                    type: 'text',
                    kind: 'lessonSection',
                    sectionType: 'quizOption',
                    quizId: `${lesson.id}-${index}`,
                    optionIndex: i,
                    answer: section.answer
                }
                this.layout.layoutNodes.set(optionRect.id, optionRect)
            }
        } else if(section.type === 'survey'){
            const questionHeight = 30
const responseHeight = 20
const optionHeight = 30

const surveyHeight =
    padding * 2 +
    questionHeight +
    responseHeight +
    section.options.length * optionHeight

            const surveyRect = {
                id: `${articleNode.id}-${index}`,
                x,
                worldY: currentY,
                width,
                height: surveyHeight,
                padding,
                color: '#e0e0e0',
                selected: false,
                question: section.question,
                type: 'survey',
                surveyType: section.surveyType,
                kind: 'lessonSection',
                sectionType: 'survey',
                options: section.options,
                surveyId: section.surveyId
            }
            this.layout.layoutNodes.set(surveyRect.id, surveyRect)
            currentY += surveyHeight + 10

            for (let i = 0; i < section.options.length; i++) {
                const optionRect = {
                    id: `${articleNode.id}-${index}-option-${i}`,
                    x: x + padding,
                    worldY:
    currentY -
    surveyHeight +
    padding +
    questionHeight +
    responseHeight +
    i * optionHeight,    
    width: width - padding * 2,                
                    height: optionHeight,
                    padding,
                    color: '#d0d0d0',
                    selected: false,
                    text: section.options[i],
                    type: 'text',
                    kind: 'lessonSection',
                    sectionType: 'surveyOption',
                    surveyId: section.surveyId,
                    optionIndex: i
                }
                this.layout.layoutNodes.set(optionRect.id, optionRect)
            }

        }
    }
    )

       // const contentHeight = currentY - worldY + 20
    const contentHeight = this.getContentHeight()
        this.layout.scroll.updateBounds(contentHeight)
    }
    getArticleCardSize(node) {
    
    const width = Math.min(
    this.layout.width * 0.8,
    500
)

   const thumbnailSize = Math.min(
    80,
    width * 0.25
)

    const excerpt =
    node.props?.articleData?.content?.substring(0,100) || ''

const textWidth =
    width - thumbnailSize - 70


const textSize =
    this.measureArticleText(
        excerpt,
        textWidth
    )


const height = Math.min(
    Math.max(
        thumbnailSize + 40,
        120
    ),
    180
)

    return {
        width,
        height,
        thumbnailSize
    }
}
getContentHeight() {

    let maxBottom = 0

    for (const node of this.layout.layoutNodes.values()) {

        const bottom = node.worldY + node.height

        if (bottom > maxBottom) {
            maxBottom = bottom
        }
    }

    return maxBottom
}
 measureArticleText(text, width) {
    const ctx = this.layout.engine.context.ctx
    ctx.font = '16px Arial'

    const words = text.split(' ')
    let line = ''
    let lines = 1

    for (const word of words) {

        const testLine = line + word + ' '
        const measured = ctx.measureText(testLine)

        if (measured.width > width) {
            lines++
            line = word + ' '
        } else {
            line = testLine
        }
    }

    return {
        lines,
        height: lines * 20
    }
}
measureParagraphText(text, width) {
const {lines} = this.measureArticleText(text, width)
return lines * 20 + 20
}
}