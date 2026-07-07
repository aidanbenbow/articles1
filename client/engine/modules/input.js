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
        this.interaction = null
    }
attach() {
        this.canvas = this.engine.context.canvas
        this.interaction = this.engine.context.getInteractionManager()
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

    const {x,y} =
        this._normalisePointerEvent(event)


    const layoutNodes =
        this.engine.context.getLayout()


    const targetNode =
        this.hitTest(
            layoutNodes,
            x,
            y
        )


    this.pointerState = {
        isDown:true,
        target:targetNode,
        x,
        y
    }

console.log('Input: pointer down at', x, y, 'targetNode:', targetNode?.id)
    this.interaction.handleTargetNode(targetNode)
}

    
       
        

_normalisePointerEvent(event) {
        const rect = this.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return { x, y }
    }
    hitTest(nodes, x, y) {

    const viewport =
        this.engine.context.getViewport()

    for(const node of nodes.values()) {

        const nodeY =
            (node.worldY ?? node.y) - viewport.scrollY


        if(
            x >= node.x &&
            x <= node.x + node.width &&
            y >= nodeY &&
            y <= nodeY + node.height
        ) {
            return node
        }
    }

    return null
}
}

function hitTest(nodes, x, y) {

    const viewport =
        this.engine.context.getViewport()

    for(const node of nodes.values()) {

        const nodeY =
            (node.worldY ?? node.y) - viewport.scrollY


        if(
            x >= node.x &&
            x <= node.x + node.width &&
            y >= nodeY &&
            y <= nodeY + node.height
        ) {
            return node
        }
    }

    return null
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