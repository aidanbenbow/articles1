import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class InputBox extends Behavior {
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 10
        const offsetY = this.node.offsetY ?? 10
        const height = this.node.height ?? 30
        return { width: Math.max((constraints.width ?? 0) - (offsetX * 2), 0), height: Math.max(height, 0) }
    }
    layout(measured,rect, context) {
       return rect
    }
    update() {}
    render(ctx, runtime) {
        rectangle( ctx, runtime)
        const x = runtime.rect.x
        const y = runtime.rect.y
        const width = runtime.rect.width
        const height = runtime.rect.height
       
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const placeholder = runtime.placeholder ?? "Enter text..."
        const text = runtime.text ?? ""
        const lines = runtime.lines ?? []
      
        const hasLines = lines.length > 0

    if (text.length === 0) {
        ctx.fillStyle = "gray"
        ctx.fillText(placeholder, x + 5, y + height / 2)
        return
    }

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + 5, y + 10 + i * 20)
    }
    }
}