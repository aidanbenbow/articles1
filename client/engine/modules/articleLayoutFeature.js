import { getNodeStyle, layoutVerticalList } from "../constants/layoutConstants.js"
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
            startX: this.layout.width / 8,
            startY,
            spacing: spacingY,
            getItemHeight: (node) => {
                const title = node.props?.title || 'article'
                const measured = this.layout.measureText(title, '16px Arial')
                return Math.max(measured.height + 80, 50) // Ensure a minimum height of 50
            },
            create: (node, worldY, startX) => {
                const {  color } = getNodeStyle(node)
const title = node.props?.title || 'article'
const thumbnail = node.props?.articleData?.photo 
const measured = this.layout.measureText(title, '16px Arial')
const thumbnailSize = 80
const width = Math.max(measured.width + 40 + thumbnailSize, 400) // Ensure a minimum width of 200
const height = Math.max(measured.height + 100, 50) // Ensure a minimum height of 50
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
                   
                   excerpt: node.props?.articleData?.content?.substring(0, 100) || ''
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
            id: articleNode.id,
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
            kind: 'article',
            borderRadius: 12,
        padding,
        lineHeight,
        fontSize: 16,
        shadow: '0 4px 16px rgba(0,0,0,0.12)'
        }

        this.layout.layoutNodes.set(articleNode.id, rect)
        this.layout.scroll.updateBounds(contentHeight)
    }
 
}