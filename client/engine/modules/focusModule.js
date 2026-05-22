import { baseModule } from "./baseModule.js";

export class FocusModule extends baseModule {
    static moduleName = 'focusModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'focusModule'
        this.focusedNodeId = null
        this.focused = false
    }
    contextExports() {
        return {
            setFocusedNode: this.setFocusedNode.bind(this),
            getFocusedNode: this.getFocusedNode.bind(this),
        }
    }
    setFocusedNode(nodeId) {
        if (this.focusedNodeId !== nodeId && !this.focused) {
            this.focusedNodeId = nodeId
            this.focused = true
            
            this.engine.emit('focusChanged', { nodeId })
        }
    }
    getFocusedNode() {
        return this.focusedNodeId ? this.context.getNode?.(this.focusedNodeId) : null
    }
attach() {
        console.log('[FocusModule] attached')
    }
}