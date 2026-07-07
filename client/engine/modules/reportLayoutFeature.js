import { createRect, getNodeStyle, LAYOUT, layoutVerticalList } from "../constants/layoutConstants.js"
import { matchesOrderedPrefix, normalize } from "./search.js"

export class ReportLayoutFeature {
    constructor(layout) {
        this.layout = layout
        this._lastFilter = ''
    }

    getReportNodes() {
        return this.layout.nodeQuery.getReports()
    }

    applyFilter(searchTerm) {
        const normalised = normalize(searchTerm)
        if (normalised === this._lastFilter) return
        this._lastFilter = normalised

        for (const [nodeId, node] of this.layout.layoutNodes.entries()) {
            if (node.kind === 'report' || node.kind === 'reportsToDo') {
                this.layout.layoutNodes.delete(nodeId)
            }
        }

        const filtered = this.getReportNodes().filter(node => {
            const name = node.props?.reportData?.name || ''
            return matchesOrderedPrefix(name, normalised)
        })

        this.layoutReportsToDo(filtered.length)
        this.layoutReports(filtered)

        this.layout.engine.emit('layoutChanged', { layout: this.layout.layoutNodes })
    }

    layoutReportsToDo(numReports) {
        const reportsToDoNode = this.layout.nodeQuery.getReportsToDoNode()

        if (!reportsToDoNode) return

        const x = this.layout.width / 2
        const worldY = this.layout.height / 8
        const { width, height, color: colour } = getNodeStyle(reportsToDoNode)

        const rect = createRect({
            x,
            worldY,
            width,
            height,
            color: colour,
            type: 'text',
            kind: 'reportsToDo',
            text: String(numReports || '')
        })

        this.layout.layoutNodes.set(reportsToDoNode.id, rect)
    }

    layoutReports(nodes = this.getReportNodes()) {
        const rects = layoutVerticalList(nodes, {
            startX: this.layout.width / 1.5,
            startY: this.layout.height / 8,
            spacing: LAYOUT.spacingY,
            getItemHeight: (node) => getNodeStyle(node).height,
            create: (node, worldY, startX) => {
                const { width, height, color } = getNodeStyle(node)
                return createRect({
                    x: startX,
                    width,
                    height,
                    worldY,
                    color,
                    type: "text",
                    kind: "report",
                    text: node.props?.reportData?.name || ''
                })
            }
        })

        for (const [id, rect] of rects.entries()) {
            this.layout.layoutNodes.set(id, rect)
        }

        if (typeof this.layout.computeScrollBounds === 'function') {
            this.layout.computeScrollBounds(rects)
        }
    }
}