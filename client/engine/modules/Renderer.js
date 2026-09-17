import { createRendererViewModel } from './rendererViewModel.js'
import { renderBackground, } from './renderUtils.js'
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
      this.animationManager = null
        this.frameRequested = false
       
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
     
        const animations = this.engine.context.getAnimationManager()

    animations?.update()

    const transitionManager = this.engine.context.getTransitionManager()
    const screenOpacity = transitionManager?.getOpacity() ?? 1
     
       // renderBackground(this.ctx, this.canvas.width, this.canvas.height, this.bgColor)
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
const viewport = this.engine.context.getViewport()

        const layout = this.engine.context.getLayout()
        const interactionState = this.engine.context.getInteractionState()
        const appState = this.engine.context.app.getState()
        const lessonState = this.engine.context.getLesson()
        const allNodes = [...layout.values()]
        const assetManager = this.engine.context.getAssetManager()
       
        const view = createRendererViewModel(allNodes, interactionState, lessonState)

this.ctx.save()
this.ctx.globalAlpha = screenOpacity

        switch (appState.screen) {
            case 'home':
                renderHome(this.ctx, view.homeNodes, viewport, assetManager)
                break
                case 'lesson':
                renderLessonScreen(this.ctx, view, viewport, lessonState, assetManager, animations)
                break
                case 'lessonBrowser':
                renderLessonBrowser(this.ctx, view.lessonBrowserNodes, viewport,  assetManager) 
                break
        }
        this.ctx.restore()
    
    }
    attach() {
       
         this._unsubscribe.push(this.engine.on('layoutChanged', this.requestRender.bind(this)))
            this._unsubscribe.push(this.engine.on('searchChanged', this.requestRender.bind(this)))
             this._unsubscribe.push(this.engine.on('reportsDataReady', this.requestRender.bind(this))) 
             this._unsubscribe.push(this.engine.on('assetLoaded', this.requestRender.bind(this)))
             this._unsubscribe.push(this.engine.on('lessonStateChanged', this.requestRender.bind(this)))
           
            this._unsubscribe.push(  this.engine.on('appStateChanged', () => this.requestRender()))
            this.animationManager = this.engine.context.getAnimationManager()
            this.animationManager.setRequestFrame(() => this.requestRender())
             setTimeout(() =>{
            this.setCanvas()
            this.setScreen()
             
            this.requestRender()
        }, 0)
    }
    detach() {
        console.log('Renderer detached')
    }
    destroy() {
        this.detach()
    }
requestRender() {

    if (this.frameRequested) {
        return
    }

    this.frameRequested = true

    requestAnimationFrame(() => {

        this.frameRequested = false

        this.render()

        if (this.animationManager.hasActiveAnimations()) {
            this.requestRender()
        }
    })
}
    
}


