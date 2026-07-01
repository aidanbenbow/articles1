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

const currentLayout = this.engine.context.getLayout()
const searchTerm = (currentLayout.get('inputNode')?.text || '').trim().toLowerCase()
this.engine.context.applyReportFilter(searchTerm)

        const layout = this.engine.context.getLayout()
        const allNodes = [...layout.values()]
        const view = createRendererViewModel(layout, allNodes)

        renderInputBoxes(this.ctx, view.inputNodes)
        renderButtons(this.ctx, view.buttonNodes)
       
        if(view.nodeSelected) {
            console.log('Rendering selected article:', view.nodeSelected)
          renderArticle(this.ctx, view.nodeSelected)
        } else {
            console.log('Rendering reports:', view.reportsNodes)
            renderReports(this.ctx, view.reportsNodes)
        }

        
        if(view.reportsToDoNode) {
            renderReportsToDo(this.ctx, view.reportsToDoNode)
        }
        
        
    }
    attach() {
        setTimeout(() =>{
            this.setCanvas()
              this._unsubscribe.push(this.engine.on('layoutChanged', this.render.bind(this)))
            this.render()
        }, 0)
            
             this._unsubscribe.push(this.engine.on('reportsDataReady', () => this.render())) 
    }
    detach() {
        console.log('Renderer detached')
    }
    destroy() {
        this.detach()
    }
    
}


