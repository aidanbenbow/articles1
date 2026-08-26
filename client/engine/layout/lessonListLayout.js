import { getNodeStyle, layoutVerticalList } from "../constants/layoutConstants.js"

export function LessonListLayout(articleNodes, layout,engine ) {
 const startY =
        layout.height / 8

    const spacingY = 20

    for (const [id, rect]
        of layout.layoutNodes) {

        if (
            rect.owner === 'lessonBrowser'
        ) {
            layout.layoutNodes.delete(id)
        }
    }

    const rects =
        layoutVerticalList(
            articleNodes,
            {
                startX: 40,
                startY,
                spacing: spacingY,

                getItemHeight: node => {

                    const {
                        height
                    } =
                        engine.context.getArticleCardSize(node)

                    return height
                },

                create: (
                    node,
                    worldY,
                    startX
                ) => {

                    const {
                        color
                    } =
                        getNodeStyle(node)

                    const articleData =
                        node.props?.articleData || {}

                    const articleId =
                        articleData.articleId || null

                    const {
                        width,
                        height,
                        thumbnailSize
                    } = engine.context.getArticleCardSize(node)

                    const progress =
                        articleId
                            ? engine.context
                                .getLessonProgressStore()
                                ?.get(articleId)
                            : null

                            const thumbnail = articleData.photo || null
                            if (thumbnail) {
                                engine.context.getAssetManager()?.loadImage(thumbnail)
                              }
                    return {

                        id:
                            `browser-${node.id}`,

                        owner:
                            'lessonBrowser',

                        kind:
                            'article',

                        articleId,

                        articleData,

                        x: startX,

                        width,
                        height,

                        color,

                        thumbnail: thumbnail,
                        thumbnailSize,

                        progress: progress || null,

                            progressPercent: progress?.progressPercent || null,

                        title:
                            node.props?.title ||
                            articleData.title ||
                            'Untitled lesson',

                        description:
                            articleData.description ||
                            articleData.excerpt ||
                            '',

                        excerpt:
                            articleData.excerpt ||
                            articleData.article
                                ?.substring(0, 100) ||
                            '',

                        action:
                            'openLesson',

                        worldY
                    }
                }
            }
        )

    for (
        const [id, rect]
        of rects.entries()
    ) {

        layout.layoutNodes.set(
            id,
            rect
        )
    }

    layout.computeScrollBounds(
        layout.layoutNodes
    )

}