import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class BasicScreen extends Behavior {
    measure(constraints) {
        return { width: constraints.width, height: constraints.height }
    }
    layout(measured) {
        return { x: 0, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
        //rectangle(this.node, ctx)
    }
}