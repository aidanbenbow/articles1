import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class ContainerBar extends Behavior{
    
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 5
        const offsetY = this.node.offsetY ?? 5
        const children = this.node.children ?? []
        for (const child of children) {
            const childMeasured = this.context?.getNodeMeasured?.(child)
            if (childMeasured) {
                offsetY += childMeasured.height + (this.node.gap ?? 5)
            }
        }
        return { width: Math.max((constraints.width ?? 0) - (offsetX * 2), 0), height: 50 }
    }
   
    layout(measured, context) {
        const parentId = this.node.parentId
        const parent = parentId ? context?.getNode?.(parentId) : null
        const parentLayout = parent ? context?.getNodeLayout?.(parent.id) : null
        const parentX = parentLayout?.x ?? parent?.x ?? 0
        const parentY = 0 + (this.node.order ?? 0) * measured.height 
        console.log('ContainerBar layout', { parentX, parentY, measured })
        console.log('order', this.node.order)
        return {
            x: parentX + 5,
            y: parentY + 5 + 20,
            width: measured.width,
            height: measured.height,
        }
    }
    update() {}

    render(ctx, runtime) {
       rectangle(this.node, ctx, runtime)
    }
}

export { ContainerBar }
export default ContainerBar