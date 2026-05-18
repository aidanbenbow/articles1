import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class InputBox extends Behavior {
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 10
        const offsetY = this.node.offsetY ?? 10
        const height = this.node.height ?? 30
        return { width: Math.max((constraints.width ?? 0) - (offsetX * 2), 0), height: Math.max(height - (offsetY * 2), 0) }
    }
    layout(measured, context) {
        const parentId = this.node.parentId
        const parent = parentId ? context?.getNode?.(parentId) : null
        const parentLayout = parent ? context?.getNodeLayout?.(parent.id) : null
        const parentMeasured = parent ? context?.getNodeMeasured?.(parent.id) : null
        const parentX = parentLayout?.x ?? parent?.x ?? 0
        const parentY = parentLayout?.y ?? parent?.y ?? 0
        const parentWidth = parentLayout?.width ?? parentMeasured?.width ?? measured.width
        const parentHeight = parentLayout?.height ?? parentMeasured?.height ?? measured.height

        const offsetX = this.node.offsetX ?? 10
        const offsetY = this.node.offsetY ?? 10
        const width = Math.min(measured.width, Math.max(parentWidth - (offsetX * 2), 0))
        const height = Math.min(measured.height, Math.max(parentHeight - (offsetY * 2), 0))

        return { x: parentX + offsetX, y: parentY + offsetY+20, width, height }
    }
    update() {}
    render(ctx, runtime) {
        rectangle(this.node, ctx, runtime)
        const x = runtime?.layouted?.x ?? this.node.x ?? 0
        const y = runtime?.layouted?.y ?? this.node.y ?? 0
        const width = runtime?.layouted?.width ?? runtime?.measured?.width ?? this.node.width ?? 0
        const height = runtime?.layouted?.height ?? runtime?.measured?.height ?? this.node.height ?? 0
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.node.content.text, x + 5, y + height / 2);
    }
}