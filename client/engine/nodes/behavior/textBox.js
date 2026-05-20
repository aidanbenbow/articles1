import { measureText, rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

export class TextBox extends Behavior {
    measure(constraints, context) {
     const drawCtx = context?.ctx
     const measured = measureText(this.node, drawCtx)
     return measured
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

        return { x: parentX + offsetX, y: parentY + offsetY, width, height }
    }
    update() {}
    render(ctx, runtime) {
       // rectangle(this.node, ctx, runtime)
        const x = runtime.rect.x
        const y = runtime.rect.y
        const width = runtime.rect.width
        const height = runtime.rect.height
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(runtime.text, x + width / 2, y + height / 2);
    }
}