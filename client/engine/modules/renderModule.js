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
            setRenderCanvas: this.setCanvas.bind(this),
        }
    }

    setCanvas(canvasOrId = 'mainCanvas') {
        const canvas = typeof canvasOrId === 'string'
            ? document.getElementById(canvasOrId)
            : canvasOrId

        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            console.warn('[RenderModule] Canvas not found or invalid')
            return false
        }

        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        return Boolean(this.ctx)
    }

    render() {
        if (!this.ctx || !this.canvas) return
        if (typeof this.context.getRoots !== 'function' || typeof this.context.getNode !== 'function') return

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        const drawNode = (node) => {
            if (!node) return

            const x = Number.isFinite(node.x) ? node.x : 0
            const y = Number.isFinite(node.y) ? node.y : 0
            const width = Number.isFinite(node.width) ? node.width : 50
            const height = Number.isFinite(node.height) ? node.height : 50
            const color = node.color || '#2d6cdf'

            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, width, height)

            for (const childId of node.children ?? []) {
                drawNode(this.context.getNode(childId))
            }
        }

        for (const root of this.context.getRoots()) {
            drawNode(root)
        }
    }

    attach() {
        this.setCanvas('mainCanvas')
        this._unsubscribe.push(this.engine.on('nodeAdded', () => this.render()))
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