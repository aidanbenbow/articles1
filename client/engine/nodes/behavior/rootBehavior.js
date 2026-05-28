import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";


export class Root extends Behavior {
    measure(node, constraints) {
        return { width: node.props.size.width, height: node.props.size.height }
    }
    layout(node, measured, rect) {
        const childRect = { x: 0, y: 0, width: measured.width, height: measured.height }
        const childRects = {}
            for(const child of node.children) {
                childRects[child.id] = childRect
            }
        return childRects
    }
    update() {}
    render(ctx) {
       // rectangle(this.node, ctx)
    }
}