export class FlexLayoutEngine {
    constructor(context) {
        this.context = context
    }

    layout(nodeId, constraints) {
        const node = this.context.getNode(nodeId)
        if (!node) return null

        const children = node.children
            .map(id => this.context.getNode(id))
            .filter(Boolean)
            .sort((a, b) => (a.props?.order ?? 0) - (b.props?.order ?? 0))

        const direction = node.props?.flexDirection ?? 'column'
        const gap = node.props?.gap ?? 0
        const padding = node.props?.padding ?? 0

        let x = padding
        let y = padding

        const childRects = []

        for (const child of children) {
            const childSize = this.measure(child, constraints)

            const rect = {
                x: x,
                y: y,
                width: childSize.width,
                height: childSize.height
            }

            childRects.push({ node: child, rect })

            if (direction === 'column') {
                y += childSize.height + gap
            } else {
                x += childSize.width + gap
            }
        }

        return {
            x: node.x ?? 0,
            y: node.y ?? 0,
            width: constraints.width,
            height: constraints.height,
            children: childRects
        }
    }

    measure(node, constraints) {
        const behavior = this.context.behaviorRegistry?.get(node.type)
        if (!behavior?.measure) {
            return { width: 100, height: 30 }
        }

        return behavior.measure(constraints, node)
    }
}