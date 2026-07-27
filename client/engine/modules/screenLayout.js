import { createRect, getNodeStyle, LAYOUT } from "../constants/layoutConstants.js"

export class ScreenLayout {
    constructor(layout) {
        this.layout = layout
    }

    layoutScreenNodes() {
        const screenNodes = this.layout.nodeQuery.getScreenNodes()
        this.layout.width = this.layout.engine.context.canvasWidth
        this.layout.height = this.layout.engine.context.canvasHeight

        const colour = screenNodes[0]?.props?.color || '#ffffff'

        const rect = createRect({
            x: 0,
            id: screenNodes[0]?.id || 'screen',
            width: this.layout.width,
            height: this.layout.height,
            color: colour,
            type: 'screen',
            kind: 'screen'
        })

        this.layout.layoutNodes = new Map(screenNodes.map(node => [node.id, rect]))
    }

    layoutHeader() {
        const headerNode = this.layout.nodeQuery.getHeaderNode()
        if (!headerNode) return
        const parentLayout = this.layout.layoutNodes.get(headerNode.parentId)
        if (!parentLayout) return

        const x = parentLayout.x 
        const worldY = parentLayout.worldY 
        const {  height, color: colour } = getNodeStyle(headerNode)
        const width = parentLayout.width 

        const rect = createRect({
            x,
            id: headerNode.id,
            worldY,
            width,
            height,
            color: colour,
            type: 'header',
            kind: 'header',
            text: headerNode.props?.text || ''
        })

        this.layout.layoutNodes.set(headerNode.id, rect)
    }

    layoutChildren() {
        this.layoutHeader()
        this.layoutInputs()
        this.layoutButtons()
    }

    layoutInputs() {
        const childInputs = this.layout.nodeQuery.getInputs()
        childInputs.forEach((node, index) => {
            const parentLayout = this.layout.layoutNodes.get(node.parentId)
            if (!parentLayout) return

            const { width, height, color: colour } = getNodeStyle(node)
            const x = parentLayout.width - LAYOUT.padding*4 - width
            const worldY = parentLayout.worldY + LAYOUT.marginTop + (index * LAYOUT.inputGap)

            const rect = createRect({
                x,
                id: node.id,
                worldY,
                width,
                height,
                color: colour,
                type: 'input'
            })

            this.layout.layoutNodes.set(node.id, rect)
        })
    }

    layoutButtons() {
        
        const childButtons = this.layout.nodeQuery.getButtons()
        childButtons.forEach((node, index) => {
            const parentLayout = this.layout.layoutNodes.get(node.parentId)
            if (!parentLayout) return

            const x = parentLayout.x + LAYOUT.padding + (index * LAYOUT.buttonGap)
            const worldY = parentLayout.worldY + LAYOUT.marginTop
            const {  color: colour } = getNodeStyle(node)
const measured = this.layout.measureText(node.props?.text || '', '16px Arial')
            const rect = createRect({
                x,
                id: node.id,
                worldY,
                width: measured.width + LAYOUT.padding * 2,
                height: measured.height + LAYOUT.padding,
                color: colour,
                type: 'button',
                text: node.props?.text || ''
            })

            this.layout.layoutNodes.set(node.id, rect)
        })
    }
   
}