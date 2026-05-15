export class Behavior {
    constructor(node) {
        this.node = node
       // this.ctx = node.ctx
        
    }
    measure(){
        console.warn(`[Behavior] measure not implemented for node ${this.node.id}`)
    }
    layout(){
        console.warn(`[Behavior] layout not implemented for node ${this.node.id}`)
    }
    update() {
        console.warn(`[Behavior] update not implemented for node ${this.node.id}`)
    }
    render() {
        console.warn(`[Behavior] render not implemented for node ${this.node.id}`)
    }
    getParent(){
        if (!this.node?.context?.getParent) return null
        return this.node.context.getParent(this.node)
    }
}