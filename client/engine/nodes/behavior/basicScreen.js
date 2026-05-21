import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class BasicScreen extends Behavior {
    measure(constraints) {
        return { width: constraints.width, height: constraints.height }
    }
    layout(measured,rect, context) {
      
        let currentX = rect?.x ?? 0
        for(const childId of this.node.children) {
            
            const childMeasured = context?.getNodeMeasured?.(childId)
            
            const childRect = { x: currentX, y: rect.y, width: childMeasured?.width ?? 0, height: rect.height }
            context?.setNodeLayout?.(childId, childRect)
            currentX += childRect.width
            console.log(`BasicScreen layout child ${childId} rect`, childRect)
        }
        return { x: rect.x, y: rect.y, width: currentX - rect.x, height: rect.height }
    }
    update() {}
    render(ctx) {
        //rectangle(this.node, ctx)
    }
}