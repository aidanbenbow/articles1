import { BarBehavior } from "./barBehavior.js"
import { BasicScreen } from "./basicScreen.js"
import { ButtonBehavior } from "./buttonBehaviour.js"
import ContainerBar from "./containerBar.js"
import { FlexBehavior } from "./flexBehavior.js"
import { InputBox } from "./inputBox.js"
import { Root } from "./rootBehavior.js"
import { TextBox } from "./textBox.js"


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
    behaviorRegistry.register('containerBar', ContainerBar)
    behaviorRegistry.register('text', TextBox)
    behaviorRegistry.register('bar', BarBehavior)
    behaviorRegistry.register('inputBox', InputBox)
    behaviorRegistry.register('button', ButtonBehavior)
    behaviorRegistry.register('flexBar', FlexBehavior)

}