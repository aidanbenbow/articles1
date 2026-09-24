import { getNodeStyle, getResponsiveLayout, LAYOUT, layoutVerticalList } from "../constants/layoutConstants.js"
import { createButtonNode } from "./nodeFactories/buttonNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"


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


        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )

    }

    layoutWelcome(currentY, appState, articleNodes) {
        const metrics = this.getMetrics()
        const {  padding, contentWidth, gap, welcome } = metrics
         const user = appState.user?.name || 'Guest'
        const score = appState.user?.score || 0
        const lessonsCompleted = appState.user?.lessonsCompleted || 0
        const lessonsAvailable = articleNodes.filter(node => node.props?.articleData?.articleId).length || 0
        const title = `Welcome ${user}`
        const progress =[
            'Your learning progress:',
            '',
            `Lessons completed: ${lessonsCompleted}`,
            `Lessons available: ${lessonsAvailable}`,
            `Points earned: ${score}`
        ].join('\n')
        const prompt = 'What would you like to learn next?'
        const instruction = [
            "How it works:",
            "1. Read the lesson",
            "2. Think about what you learned",
            "3. Answer the questions",
            "4. Complete the lesson"
        ].join("\n")
        const titleLineHeight = welcome?.titleFontSize?.lineHeight || 32
        const bodyLineHeight = welcome?.bodyFontSize?.lineHeight || 20
        const stepLineHeight = welcome?.stepFontSize?.lineHeight || 20
        const titleHeight = titleLineHeight
        const progressHeight = bodyLineHeight * 5
        const promptHeight = bodyLineHeight
        const stepHeight = stepLineHeight * 5
const contentHeight = welcome.titleTop + titleHeight + welcome.sectionGap + progressHeight + welcome.promptGap + promptHeight + welcome.sectionGap + stepHeight

const welcomeHeight = Math.max(
    welcome.height,
    contentHeight + welcome.padding * 2
)
      const nodes = this.layout.layoutNodes 
        
       nodes.set(
        'home-welcome',
        {
            id: 'home-welcome-background',
            owner: 'home',
            kind: 'homeWelcome',
interactive: false,
            x: padding,
            worldY: currentY,
            width: contentWidth,
            height: welcomeHeight,
                   style: {
                ...welcome,
                colors: LAYOUT.colors,
                
            }
        }
    )
const textX = padding + welcome.accentWidth + welcome.padding
const textWidth = contentWidth - welcome.accentWidth - welcome.padding * 2
    let y = currentY + welcome.padding+welcome.titleTop

 const addText =  createTextNode({
        id: 'home-welcome-title',
        owner: 'home',
        kind: 'text',
        x: textX,
        worldY: y,
        width: textWidth,
        height: titleHeight,
        color: LAYOUT.colors.heading,
        text: title,
        typography: 'title'
    })
    nodes.set(addText.id, addText)
    y += titleHeight + welcome.sectionGap

  const addProgressText =  createTextNode({
        id: 'home-welcome-progress',
        owner: 'home',
        kind: 'text',
        x: textX,
        worldY: y,
        width: textWidth,
        height: progressHeight,
        color: LAYOUT.colors.text,
        text: progress,
        typography: 'body'
    })
    nodes.set(addProgressText.id, addProgressText)
    y += progressHeight + welcome.promptGap

    const addPromptText = createTextNode({
        id: 'home-welcome-prompt',
        owner: 'home',
        kind: 'text',
        x: textX,
        worldY: y,
        width: textWidth,
        height: promptHeight,
        color: LAYOUT.colors.text,
        text: prompt,
        typography: 'body'
    })
    nodes.set(addPromptText.id, addPromptText)
    y += promptHeight + welcome.sectionGap

   const addInstructionText = createTextNode({
        id: 'home-welcome-instructions',
        owner: 'home',
        kind: 'text',
        x: textX,
        worldY: y,
        width: textWidth,
        height: stepHeight,
        color: LAYOUT.colors.text,
        text: instruction,
        typography: 'step'
    })
    nodes.set(addInstructionText.id, addInstructionText)
    
const articleTofu = articleNodes.find(node => node.props?.articleData?.articleId === 'tofu')

    const lessonOptions = articleTofu ? [
        articleTofu
    ] : []
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
        return nextY
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