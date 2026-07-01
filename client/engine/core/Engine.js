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
      if (isLifecycleModule) {
        instance.init?.()
      }
    }
  }
  createNode(id, type, props = {}) {
    const behavior = this.context.behaviorRegistry.getBehavior(type)

    if (!behavior) {
      console.warn(`Behavior for node type "${type}" not found`)
      return null
    }

    const node = {
      id,
      type,
      props: {
        ...props,
        size: {
          width: props.width || 100,
          height: props.height || 100,
        },
      },
    }

    return node
  }

  }