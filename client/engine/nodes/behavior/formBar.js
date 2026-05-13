import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class FormBar extends Behavior{
    measure(constraints) {
        return { width: constraints.width/2, height: constraints.height }
    }
    layout(measured) {
        return { x: measured.width/2, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
      rectangle(this.node, ctx)
    }
}

export { FormBar }
export default FormBar