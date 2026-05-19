import { baseModule } from "./baseModule.js";

export class TransformModule extends baseModule {
    static moduleName = 'transformModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'transformModule'
    }
    contextExports() {
        return {
            translateNode: this.translateNode.bind(this),
        }
    }
    translateNode(nodeId, deltaX, deltaY) {
        const node = this.context.getNode?.(nodeId)
        if (node) {
            node.x = (node.x ?? 0) + deltaX
            node.y = (node.y ?? 0) + deltaY
            this.engine.emit('nodeTranslated', { nodeId, deltaX, deltaY })
        } else {
            console.warn(`[TransformModule] translateNode: node "${nodeId}" not found`)
        }
    }
    _getNodeWorldPosition(nodeId) {
        const node = this.context.getNode?.(nodeId)
        if (!node) {
            console.warn(`[TransformModule] _getNodeWorldPosition: node "${nodeId}" not found`)
            return { x: 0, y: 0 }
        }
        const nodeLayout = this.context.getNodeLayout?.(nodeId) ?? { x: node.x ?? 0, y: node.y ?? 0 }
        return { x: nodeLayout.x, y: nodeLayout.y }
    }
    localToWorld(nodeId, localX, localY) {
        const position = this._getNodeWorldPosition(nodeId)
        return {
            x: position.x + localX,
            y: position.y + localY,
        }
    }
    worldToLocal(nodeId, worldX, worldY) {
       const position = this._getNodeWorldPosition(nodeId)
        return {
            x: worldX - position.x,
            y: worldY - position.y,
        }
    }
    convertNodePosition(nodeId, targetNodeId, x, y) {
        const worldPos = this.localToWorld(nodeId, x, y)
        return this.worldToLocal(targetNodeId, worldPos.x, worldPos.y)
    }

}