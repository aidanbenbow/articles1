import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class MessageBar extends Behavior{
    measure(constraints) {
        return { width: constraints.width/4, height: constraints.height }
    }
    layout(measured) {
        return { x: measured.width*3, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
      rectangle(this.node, ctx)
    }
}

export { MessageBar }
export default MessageBar