import { Node } from "../nodes/node.js";
import { baseModule } from "./baseModule.js";

export class NameFilterModule extends baseModule {
    static moduleName = 'nameFilterModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'nameFilterModule'
      
        this.reports = [
        { name: 'ala', message: 'hi!', report: 'good job' },
        { name: 'ana', message: 'hello!', report: 'bad job' },
        { name: 'ion', message: 'hey!', report: 'average job' },
        { name: 'maria', message: 'greetings!', report: 'excellent job' },
        { name: 'george', message: 'what\'s up!', report: 'poor job' },
    ]
   this.nameNodes = this.createNameNodes()
   this.engine.context.batchAdd(this.nameNodes.map(node => ({ node, parentId: null })))
    }

    attach() {
        this.engine.on('nameFilterChanged', this._onNameFilterChanged)
        this.engine.on('nameSelected', this._onNameSelected)
      
    }

    detach() {
        this.engine.off('nameFilterChanged', this._onNameFilterChanged)
    }

    _onNameFilterChanged = ({ query }) => {
        const q = (query ?? '').trim().toLowerCase()

const filteredIds = this.names
        .map((name, index) => ({ name, id: `name${index}` }))
        .filter(x =>
            q === '' || x.name.toLowerCase().startsWith(q)
        )
        .map(x => x.id)

        

    this.context.setChildren('containerBar6', filteredIds)

        this.engine.emit('renderRequested')
    }

_onNameSelected = ({ index }) => {
        const name = this.names[index]
        const report = this.getReportForName(name)
        console.log(`Selected name: ${name}, report: ${report?.report || 'N/A'}`)
        this.engine.dispatch({
             type: 'setReport',
             payload: {report }
          })
    }

    createNameNodes() {
        return this.reports.map((report, index) => {
            return new Node(`name${index}`, 'text', { value: report.name, color: '#e1d0d0' })
        })
    }

    getReportForName(name) {
        return this.reports.find(r => r.name === name)
    }
    get names() {
        return this.reports.map(r => r.name)
    }
}