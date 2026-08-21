import { getNodeStyle, layoutVerticalList } from "../constants/layoutConstants.js"


export class HomeLayout {

    constructor(engine, layout) {
        this.engine = engine
        this.layout = layout
    }


    build(articleNodes = []) {

        this.clear()
        let currentY = 50
        currentY = this.layoutWelcome(currentY)

        currentY = this.layoutContinue(articleNodes, currentY)

        currentY = this.layoutLessons(articleNodes, currentY)

        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )

    }

    layoutWelcome(currentY) {
        this.layout.layoutNodes.set(
        'home-welcome',
        {
            id: 'home-welcome',
            owner: 'home',
            kind: 'homeWelcome',

            x: 40,
            worldY: currentY,

            width:
                this.layout.width - 80,

            height: 150,

            title: 'Welcome',

            text:
                'Learn through interactive lessons.',

            instructions:
                'Read → Think → Answer → Complete'
        }
    )

    return currentY + 180
    }
    layoutContinue(articleNodes, currentY) {
        const continueNode = articleNodes.find(node => node.props?.continue === true)

        if (!continueNode) {
            return currentY
        }

        const style = getNodeStyle(continueNode)

        this.layout.layoutNodes.set(
            'home-continue',
            {
                id: 'home-continue',

                owner: 'home',
                kind: 'continueLessonCard',

                articleId:
                    continueNode.props?.articleData
                        ?.articleId,

                x: 40,
                worldY: currentY,

                width:
                    this.layout.width - 80,

                height:
                    style.height || 120,

                articleNode:
                    continueNode
            }
        )

        return currentY +
            (style.height || 120) +
            30
    }
    layoutLessons(
        articleNodes,
        currentY
    ) {

        const lessonNodes =
            articleNodes.filter(
                node =>
                    node.kind === 'article'
            )

        for (const node of lessonNodes) {

            const style =
                getNodeStyle(node)

            const articleData =
                node.props?.articleData || {}

            const articleId =
                articleData.articleId || null

            const progressStore =
                this.engine.context.lesson
                    .getProgressStore()

            const progress =
                articleId
                    ? progressStore?.get(
                        articleId
                    )
                    : null

            const height =
                style.height || 120

            this.layout.layoutNodes.set(
                `home-${node.id}`,
                {
                    id: `home-${node.id}`,

                    owner: 'home',
                    kind: 'lessonCard',

                    articleId,

                    title:
                        node.props?.title ||
                        articleData.title ||
                        'Untitled lesson',

                    description:
                        articleData.description ||
                        articleData.excerpt ||
                        '',

                    thumbnail:
                        articleData.photo || null,

                    progress,

                    x: 40,
                    worldY: currentY,

                    width:
                        this.layout.width - 80,

                    height,

                    action: 'openLesson',

                    articleNode: node
                }
            )

            currentY += height + 20
        }

        return currentY
    }
    clear() {
    for (const [id, node] of this.layout.layoutNodes) {
        if (node.owner === 'home') {
            this.layout.layoutNodes.delete(id)
        }
    }
}
}