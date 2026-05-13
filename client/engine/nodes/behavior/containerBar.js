import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class ContainerBar extends Behavior{
    
    measure(constraints) {
        return { width: constraints.width-15, height: constraints.height-15 }
    }
    layout(measured) {
        return { x: 205, y: 5, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
       rectangle(this.node, ctx)
    }
}

export { ContainerBar }
export default ContainerBar