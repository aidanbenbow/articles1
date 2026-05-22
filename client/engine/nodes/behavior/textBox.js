import { measureText, rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

export class TextBox extends Behavior {
    measure(constraints, context) {
     const drawCtx = context?.ctx
     const measured = measureText(this.node, drawCtx)
     return measured
    }
    layout(measured,rect, context) {
        return rect
    }
    update() {}
    render(ctx, runtime) {
       // rectangle(this.node, ctx, runtime)
       if(runtime.uistate.hidden) return
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