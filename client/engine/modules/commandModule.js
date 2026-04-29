import { baseModule } from './baseModule.js'

export class CommandModule extends baseModule {
    constructor(engine) {
        super(engine)
        this.id = 'commandModule'
        this.commands = new Map()
        this.devCommands = new Map()
    }
    contextExports() {
        return {
            registerCommand: this.registerCommand.bind(this),
            unregisterCommand: this.unregisterCommand.bind(this),
            executeCommand: this.executeCommand.bind(this),
        }
    }
    registerCommand(name, handler){
        if(!name || typeof handler !== 'function') return
        this.commands.set(name, handler)
        this.engine.emit('commandRegistered', { name })
    }
    unregisterCommand(name){
        if(!name) return
        this.commands.delete(name)
        this.engine.emit('commandUnregistered', { name })
    }
    executeCommand(name, payload){
        const handler = this.commands.get(name)
        if(handler){
            try {
                handler(payload)
            } catch (error) {
                console.error(`Error executing command "${name}":`, error)
            }
        } else {
            console.warn(`Command "${name}" not found`)
        }
    }
    attach() {
        console.log('CommandModule attached')
    }
    detach() {
        console.log('CommandModule detached')
        this.commands.clear()
    }
    destroy() {
        this.detach()
    }
}
