import { getNodeStyle, layoutVerticalList } from "../constants/layoutConstants.js"
import { matchesOrderedPrefix, normalize } from "./search.js"

export class ArticleLayoutFeature {
    constructor(layout) {
        this.layout = layout
        this._lastFilter = ''
    }

    getArticleNodes() {
        return this.layout.nodeQuery.getArticles()
    }

    getSearchBarNode() {
        return this.layout.nodeQuery.getSearchBar()
    }

    applyFilter(searchTerm) {
        const normalized = normalize(searchTerm)
        if (normalized === this._lastFilter) return
        this._lastFilter = normalized

        const filtered = this.getArticleNodes().filter(node =>
            matchesOrderedPrefix(node.props?.title || '', normalized)
        )

        this.layoutArticles(filtered)
    }

    layoutArticles(articleNodes = null) {
        articleNodes ??= this.getArticleNodes()

        if (this.layout.viewState.view === 'list') {
            this.layoutArticlesList(articleNodes)
        } else {
            const selected = articleNodes.find(
                node => node.props?.articleData?.articleId === this.layout.viewState.selectedArticleId
            )
            this.layoutArticlesDetail(selected)
        }

        this.layout.engine.emit('layoutChanged', { layout: this.layout.layoutNodes })
    }

    layoutArticlesList(articleNodes) {
        const startY = this.layout.height / 8
        const spacingY = 30

        const rects = layoutVerticalList(articleNodes, {
            startX: this.layout.width / 8,
            startY,
            spacing: spacingY,
            getItemHeight: (node) => getNodeStyle(node).height,
            create: (node, worldY, startX) => {
                const { width, height, color } = getNodeStyle(node)

                return {
                    id: node.id,
                    articleId: node.props?.articleData?.articleId || null,
                    x: startX,
                    width,
                    height,
                    color,
                    selected: false,
                    text: node.props?.title || 'article',
                    content: node.props?.articleData?.content || '',
                    article: node.props?.articleData || {},
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

        const content =
            articleNode?.props?.articleData?.content ||
            articleNode?.props?.articleData?.article ||
            ''

        const charsPerLine = Math.floor(width / 8)
        const lines = Math.ceil(content.length / charsPerLine)
        const lineHeight = 20
        const contentHeight = lines * lineHeight + padding * 2
        const colour = articleNode?.props?.color || '#ffffff'

        const rect = {
            id: articleNode.articleId,
            x,
            worldY,
            width,
            height: contentHeight,
            color: colour,
            selected: true,
            text: articleNode.props?.title || 'article',
            content,
            article: articleNode.props?.articleData || {},
            type: 'text',
            kind: 'article'
        }

        this.layout.layoutNodes.set(articleNode.id, rect)
        this.layout.scroll.updateBounds(contentHeight)
    }
}