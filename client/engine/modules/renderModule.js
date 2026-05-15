import { setupCanvas } from '../nodes/render/canvasManager.js'
import { baseModule } from './baseModule.js'

export class RenderModule extends baseModule {
    static moduleName = 'renderModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'renderModule'
        this.canvas = null
        this.ctx = null
        this._unsubscribe = []
    }

    contextExports() {
        return {
            render: this.render.bind(this),
            ctx: this.ctx,
            canvas: this.canvas,
            
        }
    }

    setCanvas() {
            const setup = setupCanvas()
            if (!setup) return
            const { ctx, canvas } = setup
      this.ctx = ctx
      this.canvas = canvas
            this.context.ctx = ctx
            this.context.canvas = canvas
            this.context.canvasWidth = canvas._logicalWidth ?? canvas.clientWidth ?? canvas.width
            this.context.canvasHeight = canvas._logicalHeight ?? canvas.clientHeight ?? canvas.height
    }

    render() {
        if (!this.ctx || !this.canvas) return
        if (typeof this.context.getRoots !== 'function' || typeof this.context.getNode !== 'function') return

        this.ctx.clearRect(0, 0, this.context.canvasWidth ?? this.canvas.width, this.context.canvasHeight ?? this.canvas.height)
        
        const drawNode = (node) => {
            if (!node) return
            node.render(this.ctx)
            for (const childId of node.children ?? []) {
                drawNode(this.context.getNode(childId))
            }
        }

        for (const root of this.context.getRoots()) {
            drawNode(root)
        }
    }

    attach() {
        this.setCanvas()
        this._unsubscribe.push(this.engine.on('nodeAdded', (nde) =>{ 
            this.context.runLayout?.()
            this.render()
            console.log('nodeAdded', nde)
        }))
        this._unsubscribe.push(this.engine.on('nodeRemoved', () => this.render()))
        this.render()
        console.log('[RenderModule] attached')
    }

    detach() {
        for (const unsubscribe of this._unsubscribe) {
            unsubscribe?.()
        }
        this._unsubscribe = []
        console.log('[RenderModule] detached')
    }
}