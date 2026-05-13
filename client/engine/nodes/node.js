export class Node {
    constructor(id,context, properties = {}) {
        this.id = id
        this.context = context
        this.behavior = this.context.behaviorRegistry ? this.context.behaviorRegistry.getBehavior(this.id) : null
        this.x = properties.x ?? 0
        this.y = properties.y ?? 0
        this.width = properties.width ?? 50
        this.height = properties.height ?? 50
        this.color = properties.color ?? '#2d6cdf'
        this.children = []
    }
    measure(constraints, ctx) {this.measured = this.behavior.measure(this, constraints, ctx)
        return this.measured
    }
    layout(measured, ctx) {this.layouted = this.behavior.layout(this, measured, ctx)
        return this.layouted
    }
    update() {this.behavior.update(this)}
    render(ctx) {this.behavior.render(this, ctx)}
}