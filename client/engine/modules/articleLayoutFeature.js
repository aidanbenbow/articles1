

import { CategoryLessonsLayout } from "../layout/screens/categoryLessonsScreen.js"
import { HomeLayout } from "../layout/screens/homeScreen.js"
import { LessonLayout } from "../layout/screens/lessonScreenLayout.js"
import { PlayerSelectLayout } from "../layout/screens/playerSelectLayout.js"
import { AnalyticsScreen } from "../layout/screens/analyticsScreen.js"


import { matchesOrderedPrefix, normalize } from "./search.js"

export class ArticleLayoutFeature {
    constructor(engine) {
        this.layout = null
        this.engine = engine
        this._unsubscribe = []
       // this._lastFilter = ''

   
        this.engine.on('lessonStateChanged', () => {    
            this.layoutArticles()
        })
        this.engine.on('appStateChanged', () => {
            this.layoutArticles()
        })
    }
    contextExports() {
        return {
           
            layoutArticles: this.layoutArticles.bind(this),
            getArticleLayoutFeature: () => this,
            getArticleCardSize: this.getArticleCardSize.bind(this),
            getContentHeight: this.getContentHeight.bind(this)
        }
    }
    attach() {
        this.layout = this.engine.context.getLayoutManager()
        this.screens = {
        home: new HomeLayout(this.engine, this.layout),

        playerSelect: new PlayerSelectLayout(
            this.engine,
            this.layout
        ),
category: new CategoryLessonsLayout(this.engine, this.layout),
analytics: new AnalyticsScreen(this.engine, this.layout),
        lesson: new LessonLayout(this.engine, this.layout),
    }
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
    getLessonProgress(articleId) {
    const store =  this.engine.context.getLessonProgressStore()
    return store?.get(articleId) ?? null
}


    layoutArticles(articleNodes = null) {
        articleNodes ??= this.getArticleNodes()
const appState = this.engine.context.app.getState()

this.clearScreenLayout()

const context = {
    layout: this.layout,
    engine: this.engine,
    articleNodes,
    appState
}
console.log(this.layout)
const screen = this.screens[appState.screen]

    if (!screen) {
        console.warn(`Unknown screen: ${appState.screen}`)
        return
    }

    screen.build(context)


        this.engine.emit('layoutChanged', { layout: this.layout.layoutNodes })
    }

    clearLessonLayout(articleNode) {

    if (!articleNode) return

    for (const [id, rect] of this.layout.layoutNodes) {

        if (
            id.startsWith(`${articleNode.id}-`) &&
            (
                rect.kind === 'lessonSection' ||
                rect.kind === 'lessonTitle' ||
                rect.kind === 'lessonControl'||
                rect.kind === 'lessonIntro'||
                rect.kind === 'startLessonButton'||
                rect.kind === 'lessonDescription'||
                rect.kind === 'lessonStats' ||
                rect.kind === 'lessonParagraph' ||
                rect.kind === 'lessonHeading'||
                rect.kind === 'lessonButton' 
            )
        ) {
            this.layout.layoutNodes.delete(id)
        }
    }
}
clearScreenLayout() {
    const screenOwners = [
        'home',
        'playerSelect',
        'category',
        'lessonBrowser',
        'lesson',
        'analytics'
    ];

    for (const [id, node] of this.layout.layoutNodes) {
        if (
            screenOwners.includes(node.owner) ||
            node.type === 'dragDrop'
        ) {
            this.layout.layoutNodes.delete(id);
        }
    }
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
