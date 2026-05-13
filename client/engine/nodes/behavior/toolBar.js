import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

class ToolBar extends Behavior {
    measure(constraints) {
        return { width: constraints.width/4, height: constraints.height }
    }
    layout(measured) {
        return { x: 0, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
        rectangle(this.node, ctx)
    }
}

export { ToolBar }
export default ToolBar