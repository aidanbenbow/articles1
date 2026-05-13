import { behaviorRegistry, registerCoreBehaviors } from "../nodes/behavior/behaviorRegistry.js"
import { BaseEngine } from "./baseEngine.js"

export class Engine extends BaseEngine {
  constructor(options = {}) {
    super()
    this.id = options.id || 'engine'

    registerCoreBehaviors()
    this.context.behaviors = behaviorRegistry

    for (const module of options.modules ?? []) {
      const isLifecycleModule = Boolean(
        module?.lifeCycleModule ?? module?.constructor?.lifeCycleModule
      )
      this.addModule(module, isLifecycleModule)
    }
  }
}