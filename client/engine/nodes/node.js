export class Node {
    constructor(id,context, properties = {}) {
        this.id = id
        this.context = context
        const BehaviorClass = this.context.behaviorRegistry ? this.context.behaviorRegistry.getBehavior(this.id) : null
        this.behavior = BehaviorClass ? new BehaviorClass(this) : null
        this.measured = null
        this.layouted = null
        Object.assign(this, properties)
        this.children = new Set()
    }
    measure(constraints, ctx) {
        if (!this.behavior?.measure) {
            this.measured = { width: this.width, height: this.height }
            return this.measured
        }
        this.measured = this.behavior.measure(constraints, ctx)
        return this.measured
    }
    layout(measured, ctx) {
        if (!this.behavior?.layout) {
            this.layouted = { x: this.x, y: this.y, width: this.width, height: this.height }
            return this.layouted
        }
        this.layouted = this.behavior.layout(measured, ctx)
        return this.layouted
    }
    update(ctx) {this.behavior?.update?.(ctx)}
    render(ctx) {this.behavior?.render?.(ctx)}
}