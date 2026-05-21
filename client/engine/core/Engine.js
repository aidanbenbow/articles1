import { behaviorRegistry, registerCoreBehaviors } from "../nodes/behavior/behaviorRegistry.js"
import { BaseEngine } from "./baseEngine.js"
import { registerCommands } from "./commands.js"

export class Engine extends BaseEngine {
  constructor(options = {}) {
    super()
    this.id = options.id || 'engine'

    this.commandHandlers = new Map()
    registerCoreBehaviors()
    registerCommands(this)
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