import { initializeDataStore } from "./appDataStore.js"

export class ReportsModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'reportsModule'
        this.dataStore = null
        this.currentReports = []
    }
    contextExports() {
        return {
            getReports: () => this.currentReports,
            completeReport: this.completeReport.bind(this),
        }
    }
    async attach() {
        this.dataStore = await initializeDataStore()
        this.currentReports = this.dataStore.reports.filter(report => report.reportYear === 26 && report.completed !== false )
        console.log('ReportsModule attached. Current reports:', this.currentReports)
        setTimeout(() => {
            this.engine.emit('reportsDataReady', { reports: this.currentReports })
            this.createReportNodes()
        }, 0)
       
    }
    async completeReport(reportId) {
        if(!reportId) return false
        const res = await fetch(`/api/reports/${reportId}/complete`, { method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: false })
        })
        
         if(!res.ok) {
            console.error('Failed to mark report as complete:', res.statusText)
            return false
        }
        this.dataStore = await initializeDataStore()
        this.currentReports = this.dataStore.reports.filter(report => report.reportYear === 26 && report.completed !== false )
        console.log('Report marked as complete. Current reports:', this.currentReports)
        this.engine.emit('reportsDataReady', { reports: this.currentReports })
        return true
      
    }
    createReportNodes() {
        this.currentReports.forEach((report, index) => {
            const reportNodeId = `reportNode_${index}`
            const color = randomColor()
            const reportNode = this.engine.context.createNode(reportNodeId, 'text', null, { reportData: report, color: color,  width: 200, height: 30})
           
        })
    }

}

function slightlyShift(hex, amount) {
    const num = parseInt(hex.slice(1), 16)

    let r = (num >> 16)
    let g = (num >> 8) & 0xff
    let b = num & 0xff

    // subtle drift instead of full brightness boost
    r = Math.max(0, Math.min(255, r + amount))
    g = Math.max(0, Math.min(255, g + amount * 0.5))
    b = Math.max(0, Math.min(255, b + amount * 0.2))

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
}