import { baseModule } from "./baseModule.js";

export class SaveModule extends baseModule {
    static moduleName = 'saveModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'saveModule'
    }
    contextExports() {
        return {
            saveState: this.saveState.bind(this),
            loadState: this.loadState.bind(this),
        }
    }
    attach() {
       this.engine.on('saveState', this._onSaveRequested)
    }
    detach() {
        this.engine.off('saveState', this._onSaveRequested)
    }
    _onSaveRequested = () => {
        const nameNode = this.context.getNode('inputNode')
        const messageNode = this.context.getNode('messageInputNode')
        const reportNode = this.context.getNode('reportInputNode')

        const data = {
            name: nameNode?.props.content.value ?? '',
            message: messageNode?.props.content.value ?? '',
            report: reportNode?.props.content.value ?? '',
        }

        console.log('Saving report:', data)

        this.engine.emit('reportSaved', data)
    }
    saveState() {
        // This can be expanded to save to localStorage or a backend
        console.log('State saved!')
    }
    loadState() {
        // This can be expanded to load from localStorage or a backend
        console.log('State loaded!')
    }
}