
import { renderHome } from '../renderers/homeRenderer.js'
import { renderLessonScreen } from '../renderers/lessonScreenRenderer.js'

import { buildRenderModel } from '../renderers/general/renderModelBuilder.js'
import { renderNode } from '../renderers/general/renderNode.js'

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
//     setScreen(){
// this.screen = this.engine.context.getLayout().get('articlesScreen')

// this.bgColor = this.screen?.color || '#ffffff'
//     }
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
    const renderModel = buildRenderModel(this.engine)
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
const {viewport, rootNodes,context} = renderModel

this.ctx.save()
try {
    this.ctx.globalAlpha = screenOpacity

    for (const node of rootNodes) {
        renderNode(
            this.ctx,
            node,
            viewport,
            context
        )
    }
} finally {
    this.ctx.restore()
}

    }
    attach() {
       
         this._unsubscribe.push(this.engine.on('layoutChanged', this.requestRender.bind(this)))
            this._unsubscribe.push(this.engine.on('searchChanged', this.requestRender.bind(this)))
             this._unsubscribe.push(this.engine.on('reportsDataReady', this.requestRender.bind(this))) 
             this._unsubscribe.push(this.engine.on('assetLoaded', this.requestRender.bind(this)))
             this._unsubscribe.push(this.engine.on('lessonStateChanged', this.requestRender.bind(this)))
           
            this._unsubscribe.push(  this.engine.on('appStateChanged', () => this.requestRender()))
            this._unsubscribe.push(this.engine.on('dragChanged', () => this.requestRender()))
            this.animationManager = this.engine.context.getAnimationManager()
            this.animationManager.setRequestFrame(() => this.requestRender())
            this._unsubscribe.push(
    this.engine.on('focusChanged', this.requestRender.bind(this))
);
             setTimeout(() =>{
            this.setCanvas()
           // this.setScreen()
             
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


