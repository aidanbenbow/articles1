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
        this._behaviorInstances = new Map()
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

    _getBehavior(layoutNode) {
        if (!layoutNode?.id) return null
        const existing = this._behaviorInstances.get(layoutNode.id)
        if (existing) {
            existing.node = layoutNode
            return existing
        }

        const BehaviorClass = this.context.behaviorRegistry?.getBehavior?.(layoutNode.type)
        if (!BehaviorClass) return null

        const instance = new BehaviorClass(layoutNode)
        this._behaviorInstances.set(layoutNode.id, instance)
        return instance
    }

    render() {
        if (!this.ctx || !this.canvas) return
        if (typeof this.context.getLayoutTrees !== 'function') return

        this.ctx.clearRect(0, 0, this.context.canvasWidth ?? this.canvas.width, this.context.canvasHeight ?? this.canvas.height)

        const drawLayoutNode = (layoutNode) => {
            if (!layoutNode) return
            const behavior = this._getBehavior(layoutNode)
            const runtime = {
                layouted: layoutNode.rect,
                measured: this.context.getNodeMeasured?.(layoutNode.id),
                layoutNode,
            }
            behavior?.render?.(this.ctx, runtime, this.context)
            for (const child of layoutNode.children ?? []) {
                drawLayoutNode(child)
            }
        }

        for (const root of this.context.getLayoutTrees() ?? []) {
            drawLayoutNode(root)
        }
    }

    attach() {
        this.setCanvas()
        this._unsubscribe.push(this.engine.on('layoutDone', () => this.render()))
        this._unsubscribe.push(this.engine.on('nodeRemoved', ({ id }) => {
            if (id) this._behaviorInstances.delete(id)
        }))
        this.context.runLayout?.()
        this.render()
        console.log('[RenderModule] attached')
    }

    detach() {
        for (const unsubscribe of this._unsubscribe) {
            unsubscribe?.()
        }
        this._unsubscribe = []
        this._behaviorInstances.clear()
        console.log('[RenderModule] detached')
    }
}