import { getNodeStyle, getResponsiveLayout, layoutVerticalList } from "../constants/layoutConstants.js"


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

    build(articleNodes = []) {
        const metrics = this.getMetrics()
const {screenHeight} = metrics

        this.clear()
        let currentY = Math.max(40, screenHeight * 0.05)
        currentY = this.layoutWelcome(currentY)

        currentY = this.layoutContinue(articleNodes, currentY)

        currentY = this.layoutSuggestedLesson(articleNodes, currentY)

        currentY = this.layoutBrowseAll(currentY)

        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )

    }

    layoutWelcome(currentY) {
        const metrics = this.getMetrics()
        const {  padding, contentWidth, gap, welcome } = metrics
        const height = welcome?.height 
        this.layout.layoutNodes.set(
        'home-welcome',
        {
            id: 'home-welcome',
            owner: 'home',
            kind: 'homeWelcome',

            x: padding,
            worldY: currentY,

            width:
                contentWidth,

            height: height,

            title: 'Welcome',

            text:
                'Learn through interactive lessons.',

            instructions:
                'Read → Think → Answer → Complete'
        }
    )

    return currentY + height + gap
    }
    layoutContinue(articleNodes, currentY) {
        const progressStore =
            this.engine.context.getLessonProgressStore()
        const continueNode =
            articleNodes.find(
                node =>
                {
                    const articleId =
                        node.props?.articleData
                            ?.articleId
                            if(!articleId) return false

                            const progress = progressStore.get(articleId)
                            
                            if(!progress) return false
                            return progress.status === 'in_progress' && progress.progressPercent > 0
                            && !progress.completed
                }
            )

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

        this.layout.layoutNodes.set(
            'home-continue',
            {
                id: 'home-continue',

                owner: 'home',
                kind: 'continueLessonCard',

                articleId:
                    articleData.articleId || null,

                title:
                    continueNode.props?.title ||
                    articleData.title ||
                    'Untitled lesson',

                progressPercent,
                thumbnail: image,
                x: (this.layout.width - contentWidth) / 2,
                worldY: currentY,

                width:
                    contentWidth,

                height ,

                articleNode:
                    continueNode,
                    articleData: articleData,

                    description:
                    articleData.description ||
                    articleData.excerpt ||
                    '',
                    action: 'openLesson'
            }
        )

        return currentY + height + gap
    }
    layoutSuggestedLesson(
    articleNodes,
    currentY
) {

    const progressStore =
        this.engine.context.getLessonProgressStore()

const metrics = this.getMetrics()
const { padding, contentWidth, gap } = metrics

    const lessonNodes =
        articleNodes.filter(
            node =>
                node?.props?.articleData?.articleId
        )

    const suggestedNode =lessonNodes[8]
        
    if (!suggestedNode) {
        return currentY
    }

    const articleData =
        suggestedNode.props?.articleData || {}

    const height = metrics.suggested?.height || 120

    this.layout.layoutNodes.set(
        'home-suggested',
        {
            id: 'home-suggested',

            owner: 'home',
            kind: 'lessonCard',

            articleId:
                articleData.articleId,

            title:
                suggestedNode.props?.title ||
                articleData.title ||
                'Suggested lesson',

            description:
                articleData.description ||
                articleData.excerpt ||
                'Explore this lesson.',

            thumbnail:
                articleData.photo || null,

            progressPercent: 0,

            action: 'openLesson',

            actionLabel: 'Start lesson',

            x: padding,
            worldY: currentY,

            width:
                contentWidth,

            height,

            articleNode:
                suggestedNode,
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

            width:
                contentWidth,

            height,

            title:
                'Browse all lessons',

            action:
                'browseLessons'
        }
    )

    return currentY + height + gap
}
    // layoutLessons(
    //     articleNodes,
    //     currentY
    // ) {

    //     const lessonNodes =
    //     articleNodes.filter(
    //         node =>
    //             node?.props?.articleData?.articleId
    //     )
    //         console.log(
    //             'LESSON NODES',
    //             lessonNodes
    //         )

    //     for (const node of lessonNodes) {

    //         const style =
    //             getNodeStyle(node)

    //         const articleData =
    //             node.props?.articleData || {}

    //         const articleId =
    //             articleData.articleId || null

    //         const progressStore =
    //             this.engine.context.getLessonProgressStore()

    //         const progress =
    //             articleId
    //                 ? progressStore?.get(
    //                     articleId
    //                 )
    //                 : null

    //         const height =
    //             style.height || 120

    //         this.layout.layoutNodes.set(
    //             `home-${node.id}`,
    //             {
    //                 id: `home-${node.id}`,

    //                 owner: 'home',
    //                 kind: 'lessonCard',

    //                 articleId,

    //                 title:
    //                     node.props?.title ||
    //                     articleData.title ||
    //                     'Untitled lesson',

    //                 description:
    //                     articleData.description ||
    //                     articleData.excerpt ||
    //                     '',

    //                 thumbnail:
    //                     articleData.photo || null,

    //                 progress,

    //                 x: 40,
    //                 worldY: currentY,

    //                 width:
    //                     this.layout.width - 80,

    //                 height,

    //                 action: 'openLesson',

    //                 articleNode: node
    //             }
    //         )

    //         currentY += height + 20
    //     }

    //     return currentY
    // }
    clear() {
    for (const [id, node] of this.layout.layoutNodes) {
        if (node.owner === 'home') {
            this.layout.layoutNodes.delete(id)
        }
    }
}
}