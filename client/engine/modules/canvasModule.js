import { setupCanvas } from "../nodes/render/canvasManager.js"

export class CanvasModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'canvasModule'
    }
    contextExports() {}
    attach() {
        const setup = setupCanvas()
        
        if (!setup) return
        const { ctx, canvas } = setup
        this.engine.context.ctx = ctx
        this.engine.context.canvas = canvas
        this.engine.context.canvasWidth = canvas._logicalWidth ?? canvas.clientWidth ?? canvas.width
        this.engine.context.canvasHeight = canvas._logicalHeight ?? canvas.clientHeight ?? canvas.height
console.log('CanvasModule attached', this.engine.context.canvasWidth, this.engine.context.canvasHeight)
    }
    detach() {
        console.log('CanvasModule detached')
    }
    destroy() {
        this.detach()
    }
}