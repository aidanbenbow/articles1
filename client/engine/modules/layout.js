import { matchesOrderedPrefix, normalize } from "./search.js"

export class Layout {
    constructor(engine) {
        this.engine = engine
        this.id = 'layout'
        this.nodes = this.engine.context.nodes
        this.layoutNodes = new Map()
        this.width = null
        this.height = null
        this._unsubscribe = []
        this._lastReportFilter = ''
        this.selectedArticleId = null
        this.view = 'list'

        this.scrollY = 0
        this.maxScrollY = 0
        this._contentBottom = 0
this._scrollByView = {
    list: 0,
    article: 0
}
        this._onWheel = this._onWheel.bind(this)
        
        this._onTouchMove = this._onTouchMove.bind(this)
      
    }
    contextExports() {
        return {
            getLayout: () => this.layoutNodes,
            applyReportFilter: this.applyReportFilter.bind(this),
            selectArticle: this.selectArticle.bind(this),
            clearSelectedArticle: this.clearSelectedArticle.bind(this),
            scrollBy: this.scrollBy.bind(this),
            setScroll: this.setScroll.bind(this),
            getScroll: () => this.scrollY,
        }
    }
    attach() {
      this.init()
this._bindWheel()

const target = this.engine.context.canvas
target.addEventListener('touchend', () => {
    this._touchStart = 0
}, { passive: false })
target.addEventListener('touchcancel', () => {
    this._touchStart = 0
}, { passive: false })

      this._unsubscribe.push(this.engine.on('articlesDataReady', () => this.init()))
    }
    _bindWheel() {
        const canvas = this.engine.context.canvas
        if (canvas) {
            canvas.addEventListener('wheel', this._onWheel, { passive: false })
            canvas.addEventListener('touchmove', this._onTouchMove, { passive: false })
        }
this._unsubscribe.push(() => {
    canvas.removeEventListener('wheel', this._onWheel)
    canvas.removeEventListener('touchmove', this._onTouchMove)
})
    }
    _onWheel(event) {
        event.preventDefault()
        const deltaY = event.deltaY
        this.scrollBy(deltaY)
    }
   _onTouchMove(event) {
        event.preventDefault()
        if(event.touches.length !== 1) return
        const currentY = event.touches[0].clientY
        if(this._touchStart === 0){
            this._touchStart = currentY
            return
        }
        const deltaY = currentY - this._touchStart
        this._touchStart = currentY
        this.scrollBy(deltaY)
    }
    init() {
       setTimeout(() => {
        this.layoutScreenNodes()
        this.layoutChildren()
       // this.layoutReports()
       this.layoutArticles()
       }, 0)
    }
    selectArticle(articleId) {
        this.selectedArticleId = articleId
        this.view = 'article'
        this.scrollY = this._scrollByView.article || 0
       // this.maxScrollY = 0
        this.init()
    }
    clearSelectedArticle() {
        this.selectedArticleId = null
        this.view = 'list'
        this.scrollY = this._scrollByView.list || 0
       // this.maxScrollY = 0
        this.init()
    }
setScroll(nextY=0) {
    const clamped = Math.max(0, Math.min(nextY, this.maxScrollY))
if(clamped === this.scrollY) return
this.scrollY = clamped
this._scrollByView[this.view] = this.scrollY
this.init()
}
scrollBy(deltaY=0) {
    this.setScroll(this.scrollY + deltaY)
}
applyReportFilter(searchTerm) {
    const normalised = normalize(searchTerm)
    if(normalised === this._lastReportFilter) return
    this._lastReportFilter = normalised

    for (const [nodeId, node] of this.layoutNodes.entries()) {
              if(node.kind === 'report'|| node.kind === 'reportsToDo') {
                this.layoutNodes.delete(nodeId)
              }
}
const sourceReports = Array.from(this.nodes.values()).filter(node => node.type === 'text' && node.props?.reportData)
const filtered = sourceReports.filter(node => {
    const name = node.props?.reportData?.name || ''
    return matchesOrderedPrefix(name, normalised)
})
this.layoutReportsToDo(filtered.length)
console.log(filtered)
this.layoutReports(filtered)
}
    layoutScreenNodes() {
        const screenNodes = Array.from(this.nodes.values()).filter(node => !node.parentId)
        this.width = this.engine.context.canvasWidth
        this.height = this.engine.context.canvasHeight
        this._contentBottom = this.height
        const colour = screenNodes[0]?.props?.color || '#ffffff'
        const rect = {x: 0, y: 0, width: this.width, height: this.height, color: colour, selected: false, text: 'hi', type:'screen'}
        this.layoutNodes = new Map(screenNodes.map(node => [node.id, rect])) 
      
    }
   
    layoutChildren(){
        const childNodes = Array.from(this.nodes.values()).filter(node => node.type === 'inputBox' && node.parentId)
        childNodes.forEach((node, index) => {
            const parentLayout = this.layoutNodes.get(node.parentId)
            if (!parentLayout) return
            const x = parentLayout.x + 20
            const y = parentLayout.y + 20 + (index * 80)
            const width = node?.props?.size?.width || 200
            const height = node?.props?.size?.height || 50
            const colour = node?.props?.color || '#000000'
            const rect = {x, y, width, height, color: colour, selected: false, text: node.props?.placeholder || '', type: 'input'}
            this.layoutNodes.set(node.id, rect)
        }
        )
        const childButtonNodes = Array.from(this.nodes.values()).filter(node => node.type === 'button' && node.parentId)
        childButtonNodes.forEach((node, index) => {
            const parentLayout = this.layoutNodes.get(node.parentId)
            if (!parentLayout) return
            const x = parentLayout.x + 20 + (index * 160)
            const y = parentLayout.y + 20
            const width = node?.props?.size?.width || 150
            const height = node?.props?.size?.height || 50
            const colour = node?.props?.color || '#000000'
            const rect = {x, y, width, height, color: colour, selected: false, text: node.props?.text || '', type: 'button'}
            this.layoutNodes.set(node.id, rect)
        }
        )
        
    }
    layoutReportsToDo(numReports) {
        const reportsToDoNode = Array.from(this.nodes.values()).find(node => node.type === 'text' && node.props?.text === 'Reports To Do')
        if (reportsToDoNode) {
            const x = this.width / 2
            const y = this.height / 8
            const width = reportsToDoNode?.props?.size?.width || 200
            const height = reportsToDoNode?.props?.size?.height || 50
            const colour = reportsToDoNode?.props?.color || '#000000'
            const rect = {x, y, width, height, color: colour, selected: false, 
                text: String(numReports || ''), 
                type: 'text', kind: 'reportsToDo'}
            this.layoutNodes.set(reportsToDoNode.id, rect)
        }
    }
    
    layoutReports(reportNodes = null) {
   
    reportNodes ??= Array.from(this.nodes.values()).filter(node => node.type === 'text' && node.props?.reportData)

        const startX = this.width / 1.5
        const startY = this.height / 8
        const spacingY = 30

    reportNodes.forEach((node, index) => {
        const worldY = startY + (index * spacingY)
        const x = startX
        const y = worldY - this.scrollY

        const width = node?.props?.size?.width || 200
        const height = node?.props?.size?.height || 50
        const colour = node?.props?.color || '#000000'

        this._contentBottom = Math.max(this._contentBottom, worldY + height+20)

        const rect = {
            id: node.id,
            reportId: node.props?.reportData?.id || null,
            x,
            y,
            width,
            height,
            color: colour,
            selected: false,
            text: node.props?.reportData?.name || 'report',
            message: node.props?.reportData?.message || '',
            report: node.props?.reportData?.report || {},
            type: 'text',
            kind: 'report'
        }
this.maxScrollY = Math.max(0, this._contentBottom - this.height)
        this.layoutNodes.set(node.id, rect)
    })
    console.log('layoutReports', this.layoutNodes)
    this.engine.emit('layoutChanged', { layout: this.layoutNodes })
}
layoutArticles(articleNodes = null) {
   articleNodes ??= Array.from(this.nodes.values()).filter(node => node.type === 'text' && node.props?.title)

if(this.view === 'list') {
    this.layoutArticlesList(articleNodes)
}
    else {
        this.layoutArticlesDetail(articleNodes.find(node => node.props?.articleData?.articleId === this.selectedArticleId))
    }
    this.engine.emit('layoutChanged', { layout: this.layoutNodes })
}
layoutArticlesList(articleNodes) {
    const startY = this.height / 8
    const spacingY = 30
    articleNodes.forEach((node, index) => {
        const worldY = startY + (index * spacingY)
        const x = this.width / 8
        const y = worldY - this.scrollY

        const width = node?.props?.size?.width || 200
        const height = node?.props?.size?.height || 50
        const colour = node?.props?.color || '#000000'

        this._contentBottom = Math.max(this._contentBottom, worldY + height+20)

        const rect = {
            id: node.id,
            articleId: node.props?.articleData?.articleId || null,
            x,
            y,
            width,
            height,
            color: colour,
            selected: false,
            text: node.props?.title || 'article',
            content: node.props?.articleData?.content || '',
            article: node.props?.articleData || {},
            type: 'text',
            kind: 'article'
        }
        this.layoutNodes.set(node.id, rect)
    })
    this.maxScrollY = Math.max(0, this._contentBottom - this.height)
}
layoutArticlesDetail(articleNode) {
    const padding = 20
    const x = this.width / 8
    const y = this.height / 8

    const width = Math.min(this.width * 0.75, 600)

    const content = articleNode?.props?.articleData?.content || articleNode?.props?.articleData?.article || ''
    const charsPerLine = Math.floor(width / 8)
    const lines = Math.ceil(content.length / charsPerLine)
    const lineHeight = 20
    const contentHeight = lines * lineHeight + padding * 2

    // set maxScrollY based on how much content overflows the visible area
    const visibleHeight = this.height - y - 50 // 50 = title offset
    this.maxScrollY = Math.max(0, contentHeight - visibleHeight)

    const height = contentHeight
    const colour = articleNode?.props?.color || '#000000'

    const rect = {
        id: articleNode.id,
        articleId: articleNode.props?.articleData?.articleId || null,
        x,
        y,
        width,
        height,
        color: colour,
        selected: true,
        text: articleNode.props?.title || 'article',
        content: articleNode.props?.articleData?.content || 
        articleNode?.props?.articleData?.article || '',
        contentOffsetY: this.scrollY,
        article: articleNode.props?.articleData || {},
        type: 'text',
        kind: 'article'
    }
    this.layoutNodes.set(articleNode.id, rect)
}
}