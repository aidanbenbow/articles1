export class Node {
    constructor(id,type,context, properties = {}) {
        this.id = id
        this.type = type
        this.context = context
        this.ctx = context.ctx
        const BehaviorClass = this.context.behaviorRegistry ? this.context.behaviorRegistry.getBehavior(this.type) : null
        this.behavior = BehaviorClass ? new BehaviorClass(this) : null
       
        this.measured = { width: properties.width ?? 100, height: properties.height ?? 100 }
        this.layouted = { x: properties.x ?? 0, 
            y: properties.y ?? 0, 
            width: this.measured.width, 
            height: this.measured.height,
         padding:{
                top: properties.paddingTop ?? 0,
                right: properties.paddingRight ?? 0,
                bottom: properties.paddingBottom ?? 0,
                left: properties.paddingLeft ?? 0,
         } }
        this.color = properties.color ?? '#2d6cdf'
        this.text = properties.text ?? ''
        this.children = new Set()
    }
    measure(constraints, ctx) {
        if (!this.behavior?.measure) {
            return this.measured
        }
        this.measured = this.behavior.measure(constraints, ctx)
        return this.measured
    }
    layout(measured, ctx) {
        if (!this.behavior?.layout) {
            return this.layouted
        }
        this.layouted = this.behavior.layout(measured, ctx)
        return this.layouted
    }
    update(ctx) {this.behavior?.update?.(ctx)}
    render(ctx) {this.behavior?.render?.(ctx)}
}