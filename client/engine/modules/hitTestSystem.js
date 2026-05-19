export class HitTestSystem {
    constructor(context) {
        this.context = context
    }
   hitTest(x, y) {
    let hitNode = null

    this.context.traversal(node => {
        const layout = this.context.getNodeLayout(node.id)

        if (
            layout &&
            x >= layout.x &&
            x <= layout.x + layout.width &&
            y >= layout.y &&
            y <= layout.y + layout.height
        ) {
            hitNode = node
            return true // stop traversal
        }

        return false
    })

    return hitNode
}
}