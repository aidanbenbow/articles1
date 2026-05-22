import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class ContainerBar extends Behavior{
    
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 15
        const offsetY = this.node.offsetY ?? 5
       
        return { width: constraints.width - (offsetX * 2), height: 70 }
    }
   
    layout(measured,rect, context) {
       let currentY = rect?.y ?? 0
        for(const childId of this.node.children) {
            const childMeasured = context?.getNodeMeasured?.(childId)
            const childRect = { x: rect.x, y: currentY, width: rect.width, height: childMeasured?.height ?? 0 }
            context?.setNodeLayout?.(childId, childRect)
            currentY += childRect.height
        
        }
        return { x: rect.x, y: rect.y, width: rect.width, height: currentY - rect.y }
    }
    update() {}

    render(ctx, runtime) {
       rectangle( ctx, runtime)
    }
}

export { ContainerBar }
export default ContainerBar