import { dataStore } from "./appDataStore.js";
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
const reportId = dataStore.reports.filter(r => r.name === nameNode?.props.content.value)[0]?.id ?? `report${Date.now()}`
console.log('Report ID to update:', reportId)
        const data = {
            name: nameNode?.props.content.value ?? '',
            message: messageNode?.props.content.value ?? '',
            report: reportNode?.props.content.value ?? '',
            messageYear: 26,
            id: reportId
        }

      this.saveState(data).then(success => {
            if (success) {
                console.log('Report saved successfully!')
                this.engine.emit('reportSaved', data)
            } else {
                console.error('Failed to save report')
            }
        })

       // this.engine.emit('reportSaved', data)
    }
   async saveState(reportData) {
        const res = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData)
        });
        if (!res.ok) {
            console.error('Failed to save report:', res.statusText);
        }
        return res.ok
    }
    loadState() {
        // This can be expanded to load from localStorage or a backend
        console.log('State loaded!')
    }
}