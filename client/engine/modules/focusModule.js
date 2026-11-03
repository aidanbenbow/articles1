import { baseModule } from "./baseModule.js";

export class FocusModule extends baseModule {
    static moduleName = 'focusModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'focusModule'
        this.focusedNodeId = null
       
    }
    contextExports() {
        return {
            setFocusedNode: this.setFocusedNode.bind(this),
            getFocusedNode: this.getFocusedNode.bind(this),
            clearFocusedNode: this.clearFocusedNode.bind(this),
        }
    }
    setFocusedNode(nodeOrId) {
        const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
        console.log("Setting focus:", nodeId);
        if (!nodeId || this.focusedNodeId === nodeId) return 
            const prevFocusedNodeId = this.focusedNodeId
            this.focusedNodeId = nodeId
        
            this.engine.emit('focusChanged', {prevFocusedNodeId, nodeId })
        
    }
    clearFocusedNode() {
       const prevFocusedNodeId = this.focusedNodeId
       if (!prevFocusedNodeId) return;
        this.focusedNodeId = null
        
        this.engine.emit('focusChanged', { prevFocusedNodeId, nodeId: null })
    }
    getFocusedNode() {
        return this.focusedNodeId ? this.context.getNode?.(this.focusedNodeId) : null
    }
attach() {
        console.log('[FocusModule] attached')
    }
}