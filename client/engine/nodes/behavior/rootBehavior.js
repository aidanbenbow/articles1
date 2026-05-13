import { Behavior } from "./behavior.js";

export class Root extends Behavior {
    
    measure( constraints) {
        return { width: constraints.width, height: constraints.height }
    }
    layout( measured) {
        return { x: 0, y: 0, width: measured.width, height: measured.height }
    }
    update() {}
    render(ctx) {
        ctx.fillStyle = this.node.color || '#2d6cdf'
        ctx.fillRect(this.node.x, this.node.y, this.node.width, this.node.height)
        
    }
}