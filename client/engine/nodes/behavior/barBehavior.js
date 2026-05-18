import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class BarBehavior extends Behavior {
    constructor(node){
        super(node)
       
    }
    measure(constraints, context) {
      
        return {
            width: constraints.width/this.node.proportion,
            height: constraints.height,
        }
    }
    layout(measured, context) {
const x = this.node.x ?? 0
        return { x: x * measured.width/2, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx, runtime) {
        rectangle(this.node, ctx, runtime)
    }
}