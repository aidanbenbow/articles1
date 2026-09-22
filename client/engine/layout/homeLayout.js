import { getNodeStyle, getResponsiveLayout, LAYOUT, layoutVerticalList } from "../constants/layoutConstants.js"
import { createButtonNode } from "./nodeFactories/buttonNode.js"


export class HomeLayout {
    constructor(engine, layout) {
        this.engine = engine
        this.layout = layout
    }
getMetrics() {
       return getResponsiveLayout(
            this.layout.width,
            this.layout.height
        )
    }

    build(articleNodes = [], appState) {
        const metrics = this.getMetrics()
const {screenHeight} = metrics

        this.clear()
        let currentY = Math.max(40, screenHeight * 0.05)
        currentY = this.layoutWelcome(currentY, appState, articleNodes)

        // currentY = this.layoutContinue(articleNodes, currentY)

        // currentY = this.layoutSuggestedLesson(articleNodes, currentY)

        // currentY = this.layoutBrowseAll(currentY)

        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )

    }

    layoutWelcome(currentY, appState, articleNodes) {
        const metrics = this.getMetrics()
        const {  padding, contentWidth, gap, welcome } = metrics
        
const statsCount = 3
const stepsCount = 4

const welcomeStyle = welcome

const requiredHeight =
    welcomeStyle.titleTop +
    welcomeStyle.titleFontSize +
    welcomeStyle.sectionGap * 3 +
    welcomeStyle.bodyFontSize +
    statsCount * (
        welcomeStyle.statHeight +
        welcomeStyle.statGap
    ) +
    welcomeStyle.promptGap +
    welcomeStyle.promptHeight +
    stepsCount * welcomeStyle.stepHeight +
    welcomeStyle.stepCircleRadius * 2 +
    padding

const welcomeHeight = Math.max(
    welcome.height,
    requiredHeight
)
        const user = appState.user?.name || 'Guest'
        const score = appState.user?.score || 0
        const lessonsCompleted = appState.user?.lessonsCompleted || 0
        const lessonsAvailable = articleNodes.filter(node => node.props?.articleData?.articleId).length || 0
        
        this.layout.layoutNodes.set(
        'home-welcome',
        {
            id: 'home-welcome',
            owner: 'home',
            kind: 'homeWelcome',
interactive: false,
            x: padding,
            worldY: currentY,
            width: contentWidth,
            height: welcomeHeight,
            padding: welcome?.padding || 28,
            rowGap: welcome?.rowGap || 8,

            title: `Welcome ${user}`,

            text: [
                'Your learning progress:',
                '',
                `• Lessons completed: ${lessonsCompleted}`,
                `• Lessons available: ${lessonsAvailable}`,
                `• Points earned: ${score}`,
                '',
                'What would you like to learn next?'
            ].join('\n'),

instructions: [
        "How it works:",
        "1. Read the lesson",
        "2. Think about what you learned",
        "3. Answer the questions",
        "4. Complete the lesson"
    ].join("\n"),            style: {
                ...welcome,
                colors: LAYOUT.colors,
                typography: LAYOUT.typography
            }
        }
    )
    
const articleTofu = articleNodes.find(node => node.props?.articleData?.articleId === 'tofu')

    const lessonOptions = [
        articleTofu
    ]
const cardBottom = currentY + welcomeHeight 
const lessonOptionsY = cardBottom + gap
  const nextY=  this.layoutLessonOptions(lessonOptionsY, lessonOptions)

    return nextY + gap
    }

layoutLessonOptions(currentY, lessonOptions) {
        const metrics = this.getMetrics()
        const { padding, contentWidth, gap, optionWidth, optionHeight } = metrics
       let nextY = currentY
        for (let i = 0; i < lessonOptions.length; i++) {
            const optionData = lessonOptions[i]?.props?.articleData || {}
        
            const title = optionData?.title || `Lesson ${i + 1}`

            const button = createButtonNode({
                id: `home-lesson-option-${i}`,
                sectionId: null,
                x: padding,
                worldY: nextY,
                width: contentWidth,
                height: optionHeight,
                color: '#23979d',
                text: `Learn about ${title}`,
                action: 'openLesson',
                kind: 'lessonOption',
                type: 'button',
                sectionType: 'button',
                owner: 'home',
                articleId: optionData?.articleId || null,
                articleData: optionData,
                padding: 0
            })
            this.layout.layoutNodes.set(   button.id, button) 
            nextY += optionHeight + gap
        }
}
    layoutContinue(articleNodes, currentY) {
        const progressStore =this.engine.context.getLessonProgressStore()
        const continueNode =articleNodes.find(
                node =>
                {  const articleId = node.props?.articleData ?.articleId
                            if(!articleId) return false
                            const progress = progressStore.get(articleId) 
                            if(!progress) return false
                            return progress.status === 'in_progress' && progress.progressPercent > 0
                            && !progress.completed
                } )

            if(!continueNode) return currentY
const metrics = this.getMetrics()
const { padding, contentWidth, gap } = metrics
const height = metrics.continueCard?.height || 120
            const articleData = continueNode.props?.articleData || {}
            const progress = progressStore.get(articleData.articleId)

            const progressPercent = progress?.progressPercent || 0
       const image = articleData.photo || null
      
        if (image) {
            this.engine.context.getAssetManager()?.loadImage(image)
          }

        this.layout.layoutNodes.set( 'home-continue',
            {
                id: 'home-continue',
                owner: 'home',
                kind: 'continueLessonCard',

                articleId:  articleData.articleId || null,

                title:  continueNode.props?.title || articleData.title || 'Untitled lesson',

                progressPercent,
                thumbnail: image,
                x: (this.layout.width - contentWidth) / 2,
                worldY: currentY,

                width:  contentWidth,

                height ,

                articleNode:  continueNode,
                    articleData: articleData,
                    description: articleData.description || articleData.excerpt || '',
                    action: 'openLesson'
            }
        )

        return currentY + height + gap
    }
    layoutSuggestedLesson(  articleNodes,  currentY) {
  
const metrics = this.getMetrics()
const { padding, contentWidth, gap } = metrics

    const lessonNodes = articleNodes.filter(  node =>   node?.props?.articleData?.articleId)
const sortedNodes = lessonNodes.sort((a, b) => {
    const aProgress = a.props?.articleData?.progress || 0
    const bProgress = b.props?.articleData?.progress || 0
    return aProgress - bProgress
})
    const suggestedNode =sortedNodes[0] || null
        
    if (!suggestedNode)  return currentY

    const articleData = suggestedNode.props?.articleData || {}

    const height = metrics.suggested?.height || 120

    this.layout.layoutNodes.set(
        'home-suggested',
        {
            id: 'home-suggested',

            owner: 'home',
            kind: 'lessonCard',

            articleId:  articleData.articleId,

            title: suggestedNode.props?.title || articleData.title || 'Suggested lesson',

            description:
                articleData.description ||
                articleData.excerpt ||
                'Explore this lesson.',

            thumbnail:  articleData.photo || null,
            progressPercent: 0,

            action: 'openLesson',
            actionLabel: 'Start lesson',

            x: padding,
            worldY: currentY,
            width:  contentWidth,
            height,
            articleNode: suggestedNode,
            articleData: articleData
        }
    )

    return currentY +height +gap
}
layoutBrowseAll(currentY) {
const metrics = this.getMetrics()
const { padding, contentWidth, gap, browseAll } = metrics
const height = browseAll?.height || 120

    this.layout.layoutNodes.set(
        'home-browse-all',
        {
            id: 'home-browse-all',
            owner: 'home',
            kind: 'browseAllLessons',

            x: padding,
            worldY: currentY,

            width: contentWidth,

            height,

            title:'Browse all lessons',

            action: 'browseLessons'
        }
    )

    return currentY + height + gap
}
    
    clear() {
    for (const [id, node] of this.layout.layoutNodes) {
        if (node.owner === 'home') {
            this.layout.layoutNodes.delete(id)
        }
    }
}
}