import { Root } from "./rootBehavior.js"

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
}