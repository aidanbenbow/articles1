import { BasicScreen } from "./basicScreen.js"
import ContainerBar from "./containerBar.js"
import FormBar from "./formBar.js"
import MessageBar from "./messageBar.js"
import { Root } from "./rootBehavior.js"
import ToolBar from "./toolBar.js"

class BehaviorRegistry {
    constructor() {
        this.behaviors = new Map()
    }

    register(nodeType, behavior) {
        this.behaviors.set(nodeType, behavior)
    }

    getBehavior(nodeType) {
        return this.behaviors.get(nodeType)
    }
}

export const behaviorRegistry = new BehaviorRegistry()

let coreBehaviorsRegistered = false
export function registerCoreBehaviors() {
    if (coreBehaviorsRegistered) return
    coreBehaviorsRegistered = true
   
    behaviorRegistry.register('root', Root)
    behaviorRegistry.register('basicScreen', BasicScreen) 
    behaviorRegistry.register('toolbar', ToolBar)
    behaviorRegistry.register('messageBar', MessageBar)
    behaviorRegistry.register('formBar', FormBar)
    behaviorRegistry.register('containerBar', ContainerBar)

}