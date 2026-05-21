export class BaseEngine {
  constructor() {
    this.id = 'engine'
    this.context = {}
    this.state = {
      
    }
    this.modules = []
    this.lifecycleModules = []
    this.eventListeners = new Map()
    this._running = false
  }

  resolveContextExports(module) {
    if (!module) return {}

    const declaration = module.contextExports ?? module.constructor?.contextExports
    const raw = typeof declaration === 'function'
      ? declaration.call(module, this.context)
      : declaration

    if (!raw || typeof raw !== 'object') return {}

    const resolved = {}
    for (const [key, value] of Object.entries(raw)) {
      resolved[key] = value === true ? module[key] : value
    }
    return resolved
  }

  registerModule(module) {
    if (!module) return
    Object.assign(this.context, this.resolveContextExports(module))
  }

  registerModules(modules) {
    if (!modules || !Array.isArray(modules)) return
    for (const module of modules) {
      this.registerModule(module)
    }
  }

  addModule(module, lifecycle = false) {
    if (!module) return;

    const alreadyAdded = this.modules.includes(module)
    if (alreadyAdded) return

    this.registerModule(module);
    this.modules.push(module);
    if (lifecycle && !this.lifecycleModules.includes(module)) {
      this.lifecycleModules.push(module)
    }
  }

  mount() {
    for (const module of this.modules) {
      module.attach?.()
    }
  }

  destroy() {
    for (const module of this.modules) {
      module.detach?.()
    }
  }

  on(eventName, handler) {
    if (!eventName || typeof handler !== 'function') return () => {};
    const listeners = this.eventListeners.get(eventName) || new Set();
    listeners.add(handler);
    this.eventListeners.set(eventName, listeners);
    return () => this.off(eventName, handler);
  }

  off(eventName, handler) {
    const listeners = this.eventListeners.get(eventName);
    if (!listeners) return;
    listeners.delete(handler);
    if (!listeners.size) this.eventListeners.delete(eventName);
  }

  emit(eventName, payload) {
    const listeners = this.eventListeners.get(eventName);
    const hasInternalListeners = Boolean(listeners?.size);

    if (hasInternalListeners) {
      for (const handler of [...listeners]) {
        try {
          handler(payload);
        } catch (error) {
          console.error(`[${this.id}] Error in event handler for ${eventName}`, error);
        }
      }
    }

    const hasExternalGateway = typeof this.onEngineEvent === 'function';
    if (!hasInternalListeners && !hasExternalGateway) {
      console.warn(`[${this.id}] No handlers for event: ${eventName}`);
    }

    if (hasExternalGateway) {
      try {
        this.onEngineEvent({ type: eventName, payload });
      } catch (error) {
        console.error(`[${this.id}] Error in onEngineEvent for ${eventName}`, error);
      }
    }
  }
  dispatch(command) {
    if (!command || typeof command !== 'object' || !command.type) return;
    const handler = this.commandHandlers?.get(command.type);
    if (!handler) {
      console.warn(`[${this.id}] No handlers for command: ${command.type}`);
      return;
    }
    try {
      const result = handler(this.context, command.payload);
      if(result){
        this.applyTransaction?.(result)
      } }catch (error) {
      console.error(`[${this.id}] Error in command handler for ${command.type}`, error);
    }
  }
  registerCommand(type, handler) {
    if (!type || typeof handler !== 'function') return;
    if (!this.commandHandlers) this.commandHandlers = new Map();
    this.commandHandlers.set(type, handler);
  }
  applyTransaction(transaction) {
    if(!transaction.updates) return
    for(const update of transaction.updates){
      this.context.updateNode?.(update.nodeId, node => {
        if(!node) return null
        const next = { ...node, ...update.patch }
        return next
      }
      )
    }
    this.emit('stateChanged', this.context)
  }

}