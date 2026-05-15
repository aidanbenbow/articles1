import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class InputBox extends Behavior {
    measure(constraints) {
        return { width: constraints.width, height: 30 }
    }
    layout(measured, context) {
        const parentId = this.node.parentId
        const parent = parentId ? context?.getNode?.(parentId) : null
        const parentX = parent?.layouted?.x ?? parent?.x ?? 0
        const parentY = parent?.layouted?.y ?? parent?.y ?? 0
        const parentWidth = parent?.layouted?.width ?? parent?.width ?? measured.width
        const parentHeight = parent?.layouted?.height ?? parent?.height ?? measured.height

        const offsetX = this.node.offsetX ?? 10
        const offsetY = this.node.offsetY ?? 10
        const width = Math.min(measured.width, Math.max(parentWidth - (offsetX * 2), 0))
        const height = Math.min(measured.height, Math.max(parentHeight - (offsetY * 2), 0))

        return { x: parentX + offsetX, y: parentY + offsetY, width, height }
    }
    update() {}
    render(ctx) {    
        rectangle(this.node, ctx)
        const x = this.node.layouted?.x ?? this.node.x ?? 0
        const y = this.node.layouted?.y ?? this.node.y ?? 0
        const width = this.node.layouted?.width ?? this.node.width ?? 0
        const height = this.node.layouted?.height ?? this.node.height ?? 0
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.node.text, x + 5, y + height / 2);
    }
}