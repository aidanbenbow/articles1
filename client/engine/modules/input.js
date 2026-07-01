export class Input {
    constructor(engine) {
        this.engine = engine
        this.id = 'input'
        this.canvas = null
        this.pointerState = {
            isDown: false,
            target: null,
            x: 0,
            y: 0,
        }
        this.selectedNode = null
    }
attach() {
        this.canvas = this.engine.context.canvas
        if (this.canvas) {
            this.canvas.addEventListener('pointerdown', this._onPointerDown)
            this.canvas.addEventListener('pointermove', this._onPointerMove)
            this.canvas.addEventListener('pointerup', this._onPointerUp)
        }
    }
    detach() {
        if (this.canvas) {
            this.canvas.removeEventListener('pointerdown', this._onPointerDown)
            this.canvas.removeEventListener('pointermove', this._onPointerMove)
            this.canvas.removeEventListener('pointerup', this._onPointerUp)
        }
    }
    _onPointerDown = (event) => {
        const { x, y } = this._normalisePointerEvent(event)
        this.pointerState.isDown = true
        this.pointerState.x = x
        this.pointerState.y = y
  
        const colorAtPoint = getCanvasColorAtPoint(this.engine.context.ctx, x, y)
        const hex = convertColorToHex(colorAtPoint)
       const layoutNodes = this.engine.context.getLayout()
        const targetNode = Array.from(layoutNodes.values()).find(node => node.color === hex)
      
        this.pointerState.target = targetNode || null
       if(targetNode.kind === 'article') {
        targetNode.selected = true
            this.engine.context.selectArticle(targetNode.articleId)
        }
        if(targetNode.type === 'button') {
            if(targetNode.text === 'back') {
                this.engine.context.clearSelectedArticle()
            }
        }
    //    layoutNodes.forEach((node, id) => {
    //         if (node === this.pointerState.target && node.type === 'input') {
    //             node.selected = true
    //             node.text = ' '
    //         } else if(node=== this.pointerState.target && node.type === 'text') {
    //             node.selected = true
    //             const inputNodes = Array.from(layoutNodes.values()).filter(node => node.type === 'input')
    //             inputNodes.forEach(inputNode => {
    //                 inputNode.selected = false
    //             })
    //             inputNodes[0].text = node.text || ''
    //             inputNodes[1].text = node.message || ''
    //             inputNodes[1].height = 70
    //             inputNodes[2].text = node.report || ''
    //             inputNodes[2].height = 400
    //             this.selectedNode = node
    //         } else if(node=== this.pointerState.target && node.type === 'button'&& node.text === 'Copy Report') {
    //             node.selected = true
    //             const reportInputNode = layoutNodes.get('reportInputNode')
                
    //             if(reportInputNode) {
    //                 const reportText = reportInputNode.text || ''
    //                 navigator.clipboard.writeText(reportText).then(() => {
    //                     console.log('Report copied to clipboard:', reportText)
    //                 }).catch(err => {
    //                     console.error('Failed to copy report:', err)
    //                 })
    //             }
    //         } else if(node=== this.pointerState.target && node.type === 'button'&& node.text === 'Complete Report') {
    //             node.selected = true
    //             const reportId = this.selectedNode?.reportId
                
    //             if(reportId) {
    //                 this.engine.context.completeReport(reportId).then(success => {
    //                     if(success) {
    //                         console.log('Report marked as complete:', reportId)
    //                         this.engine.context.removeNode(reportId)
    //                     } else {
    //                         console.error('Failed to mark report as complete:', reportId)
    //                     }
    //                 })
    //             }
              
    //         } else {
    //             node.selected = false
    //         }
    //     })
    //     this.engine.emit('layoutChanged', { layout: layoutNodes })
    }
       
        

_normalisePointerEvent(event) {
        const rect = this.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return { x, y }
    }
}

function getCanvasColorAtPoint(ctx, x, y) {
    const dpr = window.devicePixelRatio || 1;
    const backingX = Math.round(x * dpr);
    const backingY = Math.round(y * dpr);
    const pixelData = ctx.getImageData(backingX, backingY, 1, 1).data;
    return `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
}

function convertColorToHex(color) {
    const rgba = color.match(/\d+/g).map(Number)
    const hex = rgba.slice(0, 3).map(c => c.toString(16).padStart(2, '0')).join('')
    return `#${hex}`
}