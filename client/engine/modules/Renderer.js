import { createRendererViewModel } from './rendererViewModel.js'
import { renderInputBoxes, renderButtons, renderReports, renderReportsToDo, renderBackground, renderArticle, renderHeader, renderLesson, renderLessonTitle  } from './renderUtils.js'
import { renderLessonHeader } from '../renderers/renderLessonHeader.js'
import { renderLessonIntro } from '../renderers/renderLessonIntro.js'
import { renderLessonComplete } from '../renderers/renderLessonComplete.js'
import { renderHome } from '../renderers/homeRenderer.js'
import { renderLessonScreen } from '../renderers/lessonScreenRenderer.js'
import { renderLessonBrowser } from '../renderers/lessonBrowserRenderer.js'

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
      // this.setScreen()
        renderBackground(this.ctx, this.canvas.width, this.canvas.height, this.bgColor)


const viewport = this.engine.context.getViewport()
console.log('Renderer render called with viewport:', viewport)

        const layout = this.engine.context.getLayout()
        const interactionState = this.engine.context.getInteractionState()
        const appState = this.engine.context.app.getState()
        const lessonState = this.engine.context.getLesson()
        const allNodes = [...layout.values()]
        const assetManager = this.engine.context.getAssetManager()
       
        const view = createRendererViewModel(allNodes, interactionState, lessonState)

        switch (appState.screen) {
            case 'home':
                renderHome(this.ctx, view.homeNodes, viewport, assetManager)
                break

                case 'lesson':
                renderLessonScreen(this.ctx, view, viewport, lessonState, assetManager)
                break

                case 'lessonBrowser':
                renderLessonBrowser(this.ctx, view.lessonBrowserNodes, viewport,  assetManager)
                
                break

        }

        
        
    }
    attach() {
        setTimeout(() =>{
            this.setCanvas()
            this.setScreen()
              this._unsubscribe.push(this.engine.on('layoutChanged', this.render.bind(this)))
            this.render()
        }, 0)
            this._unsubscribe.push(this.engine.on('searchChanged', this.render.bind(this)))
             this._unsubscribe.push(this.engine.on('reportsDataReady', () => this.render())) 
             this._unsubscribe.push(this.engine.on('assetLoaded', () => this.render()))
             this._unsubscribe.push(this.engine.on('lessonStateChanged', () => this.render()))
    }
    detach() {
        console.log('Renderer detached')
    }
    destroy() {
        this.detach()
    }
    renderLessonHeaderOnly() {
    const viewport = this.engine.context.getViewport()
    const lessonState = this.engine.context.getLesson()

    // clear only header area
    this.ctx.clearRect(
        20,
        20,
        viewport.width - 40,
        60
    )

    renderLessonHeader(
        this.ctx,
        lessonState,
        viewport
    )
}
    
}


