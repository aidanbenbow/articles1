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
            startX: 0,
startY: 0,
moved: false,
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
            this.canvas.addEventListener('pointercancel', this._onPointerCancel)
        }
        window.addEventListener('keydown', this._onKeyDown)
    }
    detach() {
        if (this.canvas) {
            this.canvas.removeEventListener('pointerdown', this._onPointerDown)
            this.canvas.removeEventListener('pointermove', this._onPointerMove)
            this.canvas.removeEventListener('pointerup', this._onPointerUp)
            this.canvas.removeEventListener('pointercancel', this._onPointerCancel)
            this.interaction?.cancelDrag?.()
            window.removeEventListener('keydown', this._onKeyDown)
        }
    }
  _onPointerDown = (event) => {

    const {x,y} = this._normalisePointerEvent(event)

    const layoutNodes = this.engine.context.getLayout()

    const targetNode = this.hitTest(
        layoutNodes,
        x,
        y
    )

    this.pointerState = {
        isDown: true,
        target: targetNode,
        x,
        y,
        startX: x,
        startY: y,
        moved: false
    }
   
}

_onPointerMove = (event) => {

    if (!this.pointerState.isDown) return

    const {x,y} = this._normalisePointerEvent(event)

    const dx = x - this.pointerState.startX
    const dy = y - this.pointerState.startY

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        this.pointerState.moved = true
    }

    const target = this.pointerState.target

    if(this.pointerState.moved && !this.interaction?.dragState && target?.type==='draggable') {
        this.interaction.startDrag(target, 
            {x:this.pointerState.x, y:this.pointerState.y})
    }
    if(this.interaction?.dragState) {
        this.interaction.updateDrag({x,y})
    }

}
_onPointerUp = () => {

    if (!this.pointerState.isDown) return
const drag = this.interaction?.dragState

if(drag) {
 const dropTarget = this.findDropTarget(drag)

        if (dropTarget) {
            this.interaction.completeDrop(
                drag,
                dropTarget
            )
        } else {
            this.interaction.cancelDrag()
        }
} else if (
        !this.pointerState.moved &&
        this.pointerState.target
    ) {
        this.interaction.handleTargetNode(
            this.pointerState.target
        )
    }

    this._resetPointerState()
}
_onPointerCancel = () => {
    this.interaction?.cancelDrag?.()
    this._resetPointerState()
}
_resetPointerState(){
    this.pointerState = {
        isDown:false,
        target:null,
        x:0,
        y:0,
        startX:0,
        startY:0,
        moved:false
    }
}
    _onKeyDown = (event) => {
        const state = this.engine.context.getInteractionState()
        if(!state.focusedNodeId) return

        if(event.key === 'Backspace') {
            this.interaction.removeSearchTerm()
        }

        if(event.key.length === 1) {
            this.interaction.appendSearchTerm(event.key)
        }
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
    (node.worldY ?? node.y ?? 0) - viewport.y
if(node.kind === 'screen' || node.kind === 'header' || node.sectionType === 'quiz'
    || node.sectionType === 'survey' || node.sectionType === 'ordering'||node.interactive === false) 
 continue

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
rectsOverlap(rect1, rect2) {
    return !(
        rect1.x + rect1.width < rect2.x ||
        rect1.x > rect2.x + rect2.width ||
        rect1.y + rect1.height < rect2.y ||
        rect1.y > rect2.y + rect2.height
    )
}
findDropTarget(dragState) {
    const layout = this.engine.context.getLayout()
    const viewport = this.engine.context.getViewport()
    const dragRect = {
        x: dragState.x - dragState.wordNode.width / 2,
        y: dragState.y - dragState.wordNode.height / 2,
        width: dragState.wordNode.width,
        height: dragState.wordNode.height
    }
    for(const node of layout.values()) {
        if(node.sectionType !== 'dragDropGap'){continue}
    
    const gapRect = {
        x: node.x,
        y: (node.worldY ?? node.y ?? 0) - viewport.y,
        width: node.width,
        height: node.height
    }
    if(this.rectsOverlap(dragRect, gapRect)) {
        return node
    }}
    return null
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