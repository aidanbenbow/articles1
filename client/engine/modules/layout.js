
import { ArticleLayoutFeature } from "./articleLayoutFeature.js"
import { NodeQuery } from "./nodeQuery.js"
import { ReportLayoutFeature } from "./reportLayoutFeature.js"
import { ScreenLayout } from "./screenLayout.js"
import { ScrollManager } from "./scroll.js"
import { ScrollController } from "./scrollController.js"


export class Layout {
    constructor(engine) {
        this.engine = engine
        this.id = 'layout'
        this.nodes = this.engine.context.nodes
        this.nodeQuery = new NodeQuery(this.nodes)
        this.layoutNodes = new Map()
        this.width = null
        this.height = null
        this._unsubscribe = []
        this.reportFeature = new ReportLayoutFeature(this)
     
        this.screenLayout = new ScreenLayout(this)
        
        this.viewState = {
            view: 'list',
                selectedArticleId: null,
        }

        this.scroll = new ScrollManager(this)

        this.scrollController = new ScrollController(
            {
                getCanvas: () => this.engine.context.canvas,
                onDelta: (delta) => {
                    this.scroll.scrollBy(delta)
                    this.engine.emit('layoutChanged', { layout: this.layoutNodes })
                }
            }
        )
      
    }
 
    contextExports() {
        return {
            getLayout: () => this.layoutNodes,
            getLayoutManager: () => this,
            applyReportFilter: this.reportFeature.applyFilter.bind(this.reportFeature),
           // applyArticleFilter: this.articleFeature.applyFilter.bind(this.articleFeature),
            selectArticle: (id)=> this.setView('article', id),
            clearSelectedArticle: () => this.setView('list'),
            scrollBy: this.scroll.scrollBy.bind(this.scroll),
            setScroll: this.scroll.setScroll.bind(this.scroll),
            getScroll: () => this.scroll.scrollY,
           getViewport: this.getViewPort.bind(this),
        }
    }
    attach() {
      this.init()
this.scrollController.attach()
this._unsubscribe.push(() => this.scrollController.detach())

      this._unsubscribe.push(this.engine.on('articlesDataReady', () => this.init()))
    }
    
getViewPort() {
    return this.scroll.getViewport()
}


    init() {
       setTimeout(() => {
        this.screenLayout.layoutScreenNodes()
        this.screenLayout.layoutChildren()
      
      this.layoutArticles()
      this.engine.emit('layoutChanged', { layout: this.layoutNodes })
       }, 0)
    }
    layoutArticles() {
        const state = this.engine.context.getInteractionState()
this.engine.context.getArticleLayoutFeature().layoutArticles(null, state)

    }
    setView(view, articleId = null) {
    // this.viewState.view = view
    // this.viewState.selectedArticleId = articleId

    this.scroll.scrollY = this.scroll.scrollByView[view] || 0
    this.init()
}

  

computeScrollBounds(rects) {
    let maxBottom = 0

    for (const rect of rects.values()) {
        const bottom = rect.worldY + rect.height
        if (bottom > maxBottom) {
            maxBottom = bottom
        }
    }

    this.scroll.updateBounds(maxBottom)
}

}
