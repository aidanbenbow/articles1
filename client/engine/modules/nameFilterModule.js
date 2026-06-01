import { Node } from "../nodes/node.js";
import { dataStore, initializeDataStore } from "./appDataStore.js";
import { baseModule } from "./baseModule.js";

export class NameFilterModule extends baseModule {
    static moduleName = 'nameFilterModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'nameFilterModule'
        this.reports = []
    
   this.nameNodes = []
 this.layoutCache = new Map()
    }

    async init() {
 await initializeDataStore()
//  this.rep = dataStore.reports
//  this.year = this.rep.filter(r => r.messageYear === 26)
 //console.log('Reports for year 26:', this.year)
this.reports = dataStore.reports 
// const toDo = this.reports.length
// const toDoNode = this.context.getNode('toDo')
// toDoNode.props.content.value = ` ${toDo}`
// console.log(`Loaded ${toDo} reports for year 26`, toDoNode)
this.nameNodes = this.createNameNodes()
this.engine.context.batchAdd(this.nameNodes.map(node => ({ node, parentId: null })))
        this.fillLayoutCache()
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
          
        ).slice(0, 5)
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
            return new Node(`name${index}`, 'text', { value: report.name, color: '#e1d0d0', flexGrow: 10 })
        })
    }

    getReportForName(name) {
        return this.reports.find(r => r.name === name)
    }
    get names() {
        return this.reports.map(r => r.name)
    }

    measureTextWidth(text, font = '16px Arial') {
        if (!this.context?.canvas) return 0
        const ctx = this.context.canvas.getContext('2d')
        ctx.font = font
        const metrics = ctx.measureText(text)
        return metrics.width
    }
   
    wrapText(text, maxWidth, font = '16px Arial') {
        if (!this.context?.canvas) return [text]
        const ctx = this.context.canvas.getContext('2d')
        ctx.font = font
        const words = text.split(' ')
        let line = ''
        const lines = []
        for (const word of words) {
            const testLine = line + word + ' '
            const metrics = ctx.measureText(testLine)
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line.trim())
                line = word + ' '
            } else {
                line = testLine
            }
        }
        if (line.trim() !== '') lines.push(line.trim())
        return lines
    }

    createLayoutCacheForReport(report, font = '16px Arial', padding = 10) {
        const maxWidth = 433
        const textWidth = this.measureTextWidth(report.message, font)
        const width = Math.min(textWidth + padding * 2, maxWidth)
        const lines = this.wrapText(report.message, maxWidth - padding * 2, font)
        const lineHeight = 20
        const height = lines.length * lineHeight + padding * 2
        return { width, height, lines }
    }
    fillLayoutCache() {
        for (const report of this.reports) {
            const cache = this.createLayoutCacheForReport(report)
            this.layoutCache.set(report.name, cache)
        }
    }
}