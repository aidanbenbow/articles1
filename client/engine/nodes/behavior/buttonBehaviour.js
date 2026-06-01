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
        const miniBtn = {
            ...runtime,
            rect: {
                
                width: 100,
                height: 40,
                x: runtime.rect.x + (runtime.rect.width - 100) / 2,
                y: runtime.rect.y + (runtime.rect.height - 40) / 2
            }
        }
  
        rectangle(ctx, miniBtn)
        const x = miniBtn.rect.x
        const y = miniBtn.rect.y
        const width = miniBtn.rect.width
        const height = miniBtn.rect.height
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = runtime.text ?? "Button"
       
        ctx.fillText(text, x + width / 2, y + height / 2);
    }
}