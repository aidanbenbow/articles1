import { baseModule } from "./baseModule.js";

export class LayOutModule extends baseModule {
    static moduleName = 'layOutModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'layOutModule'
        this._unsubscribe = []
    }

    contextExports() {
        return {
            runLayout: this.runLayout.bind(this),
        }
    }

    // Measure pass: parent passes constraints down, each node returns its desired size.
    _measure(node, constraints) {
        if (!node) return
        let measured = node.measure?.(constraints, this.context) ?? {
            width: node.width ?? constraints.width,
            height: node.height ?? constraints.height,
        }
        // Recurse into children with the measured size as new constraints
        for (const childId of node.children ?? []) {
            const child = this.context.getNode(childId)
            this._measure(child, measured)
        }

        const adjustedMeasured = node.behavior?.afterChildrenMeasure?.(measured, constraints, this.context)
        if (adjustedMeasured) {
            node.measured = adjustedMeasured
            measured = adjustedMeasured
        }
        return measured
    }

    // Layout pass: parent assigns positions/sizes to each child.
    _layout(node, offset = { x: 0, y: 0 }) {
        if (!node) return
        const measured = node.measured ?? { width: node.width, height: node.height }
        node.layout?.(measured, this.context)

        const childOffset = { x: node.x ?? offset.x, y: node.y ?? offset.y }
        for (const childId of node.children ?? []) {
            const child = this.context.getNode(childId)
            this._layout(child, childOffset)
        }
    }

    runLayout() {
        const roots = this.context.getRoots?.()
        if (!roots?.length) return

        const viewport = {
            width: this.context.canvasWidth ?? 800,
            height: this.context.canvasHeight ?? 600,
        }

        for (const root of roots) {
            this._measure(root, viewport)
            this._layout(root, { x: 0, y: 0 })
        }

        this.engine.emit('layoutDone')
    }

    attach() {
        this._unsubscribe.push(this.engine.on('nodeAdded', () => this.runLayout()))
        this._unsubscribe.push(this.engine.on('nodeRemoved', () => this.runLayout()))
        this.runLayout()
        console.log('[LayOutModule] attached')
    }

    detach() {
        for (const unsubscribe of this._unsubscribe) {
            unsubscribe?.()
        }
        this._unsubscribe = []
        console.log('[LayOutModule] detached')
    }
}
