export class Node {
    constructor(id,context, properties = {}) {
        this.id = id
        this.context = context
        const BehaviorClass = this.context.behaviorRegistry ? this.context.behaviorRegistry.getBehavior(this.id) : null
        this.behavior = BehaviorClass ? new BehaviorClass(this) : null
        this.x = properties.x ?? 0
        this.y = properties.y ?? 0
        this.width = properties.width ?? 50
        this.height = properties.height ?? 50
        this.color = properties.color ?? '#2d6cdf'
        this.children = []
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