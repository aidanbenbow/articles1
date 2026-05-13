import { behaviorRegistry, registerCoreBehaviors } from "../nodes/behavior/behaviorRegistry.js"
import { BaseEngine } from "./baseEngine.js"

export class Engine extends BaseEngine {
  constructor(options = {}) {
    super()
    this.id = options.id || 'engine'

    registerCoreBehaviors()
    this.context.behaviorRegistry = behaviorRegistry
   

    for (const ModuleClass of options.modules ?? []) {
      const instance = new ModuleClass(this)
      const isLifecycleModule = Boolean(
        ModuleClass?.lifeCycleModule ?? instance?.constructor?.lifeCycleModule
      )
      this.addModule(instance, isLifecycleModule)
    }
  }
}