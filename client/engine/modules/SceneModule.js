export class SceneModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'sceneModule'
       
    }
    contextExports() {
        return {
            createNode: this.createNode.bind(this),
            removeNode: this.removeNode.bind(this),
        }
    }
    createNode(id, type, parentId = null, props = {}) {
        const node = this.engine.createNode(id, type, props)
        if (!node) {
            console.warn(`Failed to create node of type "${type}" with id "${id}"`)
            return null
        }
        this.addNode(node, parentId)
        return node
    }
    addNode(node, parentId = null) {
        if(parentId) {
            node.parentId = parentId
        }
        this.engine.context.nodes.set(node.id, node)
       
    }
    removeNode(nodeId) {
        const node = this.engine.context.nodes.get(nodeId)
        if (!node) {
            console.warn(`Node with id "${nodeId}" does not exist`)
            return
        }
        this.engine.context.nodes.delete(nodeId)
    }
    attach() {
        console.log('SceneModule attached', this.engine.context.nodes)
    }
    detach() {
        console.log('SceneModule detached')
        // Optionally, clear the scene graph when detaching
        // this.engine.context.clearScene()
    }
    destroy() {
        this.detach()
    }

}