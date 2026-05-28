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
   
    behaviorRegistry.register('root', new Root())
    behaviorRegistry.register('basicScreen', new BasicScreen()) 
    behaviorRegistry.register('containerBar', new ContainerBar())
    behaviorRegistry.register('text', new TextBox())
    behaviorRegistry.register('bar', new BarBehavior())
    behaviorRegistry.register('inputBox', new InputBox())
    behaviorRegistry.register('button', new ButtonBehavior())
    behaviorRegistry.register('flexBar', new FlexBehavior())

}