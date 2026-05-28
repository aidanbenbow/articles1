import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class ButtonBehavior extends Behavior {
    measure(node,constraints) {
        return { width: 100, height: 40 }
    }
    layout(measured, rect, context) {
        return rect
    }
    render(ctx, runtime) {
        rectangle(ctx, runtime)
        const x = runtime.rect.x
        const y = runtime.rect.y
        const width = runtime.rect.width
        const height = runtime.rect.height
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = runtime.text ?? "Button"
        ctx.fillText(text, x + width / 2, y + height / 2);
    }
}