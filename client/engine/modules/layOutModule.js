import { baseModule } from "./baseModule.js";
import { createLayoutNode } from "../nodes/layout/createLayoutNode.js";
function wrapText(text, maxWidth, font, ctx) {
    if (!ctx) return [text]
    ctx.font = font
    const words = text.split(' ')
    let line = ''
    const lines = []
    for (const word of words) {
       const testLine = line ? `${line} ${word}` : word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && line !== '') {
            lines.push(line.trim())
            line = word + ' '
        } else {
            line = testLine
        }
    }
    if (line.trim() !== '') lines.push(line.trim())
    return lines
}

export class LayOutModule extends baseModule {
    static moduleName = 'layOutModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'layOutModule'
        this._unsubscribe = []
        this._behaviorInstances = new Map()
        this._layoutTrees = []
        this._measuredById = new Map()
        this._layoutById = new Map()
    }

    contextExports() {
        return {
            runLayout: this.runLayout.bind(this),
            getLayoutTree: this.getLayoutTree.bind(this),
            getLayoutTrees: this.getLayoutTrees.bind(this),
            getNodeMeasured: this.getNodeMeasured.bind(this),
            getNodeLayout: this.getNodeLayout.bind(this),
            setNodeLayout: this.setNodeLayout.bind(this),
            measureNode: this._measure.bind(this),
            
        }
    }

    _getBehavior(node) {
    if (!node) return null

    const BehaviorClass =
        this.context.behaviorRegistry?.getBehavior?.(node.type)

    if (!BehaviorClass) return null

    return new BehaviorClass(node)
}

    _defaultMeasured(node, constraints) {
        return {
            width: node?.width ?? constraints?.width ?? 100,
            height: node?.height ?? constraints?.height ?? 100,
        }
    }

    _defaultLayout(node, measured) {
        return {
            x: node?.x ?? 0,
            y: node?.y ?? 0,
            width: measured?.width ?? 0,
            height: measured?.height ?? 0,
        }
    }

    // Measure pass: parent passes constraints down, each node returns its desired size.
    _measure(node, constraints) {
        if (!node) return
        const behavior = this._getBehavior(node)

        let measured 

        if(node.type === 'inputBox' || node.type === 'text') {
            const ctx = this.context.ctx
            ctx.font = "16px Arial";
            const text = node.props.content?.value ?? ''
            const lines = wrapText(text, constraints?.width - 20 ?? 180, ctx.font, ctx)
    
            const lineHeight = 20
            measured = {
                width: Math.min(constraints?.width ?? 100, Math.max(...lines.map(line => ctx.measureText(line).width)) + 20),
                height: lines.length * lineHeight + 20,
                lines,
            }
            this._measuredById.set(node.id, measured)
            } else {
            measured = behavior?.measure?.(constraints, this.context)// ?? this._defaultMeasured(node, constraints)
            this._measuredById.set(node.id, measured)
        }

       // Recurse into children with the measured size as new constraints
        for (const childId of node.children ?? []) {
            const child = this.context.getNode(childId)
            this._measure(child, measured)
        }

        return measured
    }

    // Layout pass: parent assigns positions/sizes to each child.
    _layout(node, asignedRect = null) {
        if (!node) return
        const behavior = this._getBehavior(node)
        const measured = this._measuredById.get(node.id) ?? this._defaultMeasured(node, asignedRect)
        const rect = asignedRect ?? this._defaultLayout(node, measured)
       
        const computed = behavior?.layout?.(measured,rect, this.context) ??rect
        this._layoutById.set(node.id, computed)

        for (const childId of node.children ?? []) {
            const child = this.context.getNode(childId)
            const childRect = this._layoutById.get(childId) 
            this._layout(child, childRect)
        }
        
    }

    runLayout() {
        const roots = this.context.getRoots?.()
        if (!roots?.length) return

        this._measuredById.clear()
        this._layoutById.clear()

        const viewport = {
            width: this.context.canvasWidth ?? 800,
            height: this.context.canvasHeight ?? 600,
        }
        const rootRect = { x: 0, y: 0, width: viewport.width, height: viewport.height }

        for (const root of roots) {
            this._measure(root, viewport)
            this._layout(root, rootRect)
        }

        this._layoutTrees = roots.map((root) => this._buildLayoutTree(root))
        console.log('[LayOutModule] layout completed', { layoutTrees: this._layoutTrees})
        const inputnode = this.context.getNode?.('messageInputNode')
        if(inputnode){
            console.log('Input node layout:', inputnode)
        }
        this.context.layoutTrees = this._layoutTrees

        this.engine.emit('layoutDone')
    }

    _buildLayoutTree(node) {
        if (!node) return null
        const children = (node.children ?? [])
            .map((childId) => this.context.getNode(childId))
            .map((child) => this._buildLayoutTree(child))
            .filter(Boolean)

        return createLayoutNode(node, this.getNodeLayout(node.id), children)
    }

    getNodeMeasured(nodeOrId) {
        const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
        if (!nodeId) return null
        return this._measuredById.get(nodeId) ?? null
    }

    getNodeLayout(nodeOrId) {
        const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
        if (!nodeId) return null
        return this._layoutById.get(nodeId) ?? null
    }

    setNodeLayout(nodeOrId, layout) {
        const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
        if (!nodeId || !layout) return null
        this._layoutById.set(nodeId, layout)
        return layout
    }

    getLayoutTree(rootId = null) {
        if (!this._layoutTrees.length) return null
        if (!rootId) return this._layoutTrees[0] ?? null

        const stack = [...this._layoutTrees]
        while (stack.length) {
            const current = stack.pop()
            if (!current) continue
            if (current.id === rootId) return current
            stack.push(...(current.children ?? []))
        }
        return null
    }

    getLayoutTrees() {
        return [...this._layoutTrees]
    }
   
    attach() {
        this._unsubscribe.push(this.engine.on('stateChanged', () => this.runLayout()))
        this._unsubscribe.push(this.engine.on('keyPress', () => this.runLayout()))
        this._unsubscribe.push(this.engine.on('nodeAdded', () => this.runLayout()))
        this._unsubscribe.push(this.engine.on('nodesBatchAdded', () => this.runLayout()))
        
        this._unsubscribe.push(this.engine.on('nodeRemoved', ({ id }) => {
            if (id) this._behaviorInstances.delete(id)
            this.runLayout()
        }))
       // this.runLayout()
        console.log('[LayOutModule] attached')
    }

    detach() {
        for (const unsubscribe of this._unsubscribe) {
            unsubscribe?.()
        }
        this._unsubscribe = []
        this._behaviorInstances.clear()
        this._layoutTrees = []
        this._measuredById.clear()
        this._layoutById.clear()
        console.log('[LayOutModule] detached')
    }
}
