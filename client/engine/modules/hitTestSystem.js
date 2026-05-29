export class HitTestSystem {
    constructor(context) {
        this.context = context
    }
   hitTest(x, y) {
        const nodes = this.context.getLayoutTrees?.()
        console.log('[HitTestSystem]', { x, y, nodes })
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i]
            const layout = this.context.getNodeLayout?.(node.id)
            if (layout &&
                x >= layout.x && x <= layout.x + layout.width &&
                y >= layout.y && y <= layout.y + layout.height) {
                return node
            }
        }
        return null
    }
    _flattenLayoutTree(node) {
        if (!node) return []
        const children = (node.children ?? []).flatMap(child => this._flattenLayoutTree(child))
        return [node, ...children]
    }
}