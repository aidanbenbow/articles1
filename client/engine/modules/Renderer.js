import { createRendererViewModel } from './rendererViewModel.js'
import { renderInputBoxes, renderButtons, renderReports, renderReportsToDo, renderBackground, renderArticle  } from './renderUtils.js'

export class Renderer {
    constructor(engine) {
        this.engine = engine
        this.id = 'renderer'
        this.ctx = null
        this.canvas = null
        this._unsubscribe = []
        this.screen = null
        this.bgColor = null
       
    }
    contextExports() {
        return {
            render: this.render.bind(this),
        }
    }
    setScreen(){
this.screen = this.engine.context.getLayout().get('articlesScreen')

this.bgColor = this.screen?.color || '#ffffff'
    }
    setCanvas() {
        if (!this.engine.context.canvas) {
            console.warn('No canvas provided to Renderer')
            return
        }
        this.canvas = this.engine.context.canvas
        this.ctx = this.engine.context.ctx 
       
    }
    
    render() {
       this.setScreen()
        renderBackground(this.ctx, this.canvas.width, this.canvas.height, this.bgColor)


const viewport = this.engine.context.getViewport()


        const layout = this.engine.context.getLayout()
        const viewState = this.engine.context.getInteractionState()
        const allNodes = [...layout.values()]
        const assetManager = this.engine.context.getAssetManager()
        
        const view = createRendererViewModel(allNodes, viewState)

        renderInputBoxes(this.ctx, view.inputNodes, viewport, viewState.searchTerm)
        renderButtons(this.ctx, view.buttonNodes, viewport)
       
        if(view.nodeSelected) {
            
          renderArticle(this.ctx, view.nodeSelected, viewport)
        } else {
           // console.log('Rendering reports:', view.reportsNodes)
            renderReports(this.ctx, view.reportsNodes, viewport, assetManager)
        }

        
        if(view.reportsToDoNode) {
            renderReportsToDo(this.ctx, view.reportsToDoNode, viewport)
        }
        
        
    }
    attach() {
        setTimeout(() =>{
            this.setCanvas()
              this._unsubscribe.push(this.engine.on('layoutChanged', this.render.bind(this)))
            this.render()
        }, 0)
            this._unsubscribe.push(this.engine.on('searchChanged', this.render.bind(this)))
             this._unsubscribe.push(this.engine.on('reportsDataReady', () => this.render())) 
             this._unsubscribe.push(this.engine.on('assetLoaded', () => this.render()))
    }
    detach() {
        console.log('Renderer detached')
    }
    destroy() {
        this.detach()
    }
    
}


