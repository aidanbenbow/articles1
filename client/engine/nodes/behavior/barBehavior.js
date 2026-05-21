import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class BarBehavior extends Behavior {
    constructor(node){
        super(node)
       
    }
    measure(constraints, context) {
      
        return {
            width: constraints.width/this.node.proportion,
            height: constraints.height,
        }
    }
    layout(measured,rect, context) {
        let currentY = rect?.y ?? 0
        for(const childId of this.node.children) {
            const childMeasured = context?.getNodeMeasured?.(childId)
            const childRect = { x: rect.x, y: currentY, width: rect.width, height: childMeasured?.height ?? 0 }
            context?.setNodeLayout?.(childId, childRect)
            currentY += childRect.height
            console.log(`BarBehavior layout child ${childId} rect`, childRect)
        }
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }

    }
    update() {}
    render(ctx, runtime) {
        rectangle(ctx, runtime)
    }
}