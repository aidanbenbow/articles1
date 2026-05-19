import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class ContainerBar extends Behavior{
    
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 15
        const offsetY = this.node.offsetY ?? 5
       
        return { width: constraints.width - (offsetX * 2), height: 70 }
    }
   
    layout(measured, context) {
        const parentId = this.node.parentId
        const parent = parentId ? context?.getNode?.(parentId) : null
        const parentLayout = parent ? context?.getNodeLayout?.(parent.id) : null
        const parentX = parentLayout?.x ?? parent?.x ?? 0
        const order = this.node.props.layout.order ?? 0
        const parentY = 0 + order * measured.height 
        const gap = this.node.props.spacing.gap ?? 5
        const space =  gap * order
      
        return {
            x: parentX + 5,
            y: parentY + 5 + 20 + space,
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