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
   try{
    this.canvas?.setPointerCapture(event.pointerId)
   } catch(e) {
    console.warn('Failed to set pointer capture', e)
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

    if(this.pointerState.moved && !this.interaction?.dragState && target?.type==='dragDropWord') {
        this.interaction.startDrag(target, 
            {x:this.pointerState.x, y:this.pointerState.y})
    }
    if(this.interaction?.dragState) {
        this.interaction.updateDrag({x,y})
    }

}
_onPointerUp = (event) => {

    if (!this.pointerState.isDown) return
const drag = this.interaction?.dragState

const {x,y} = this._normalisePointerEvent(event)
this.pointerState.x = x
this.pointerState.y = y

if(drag) {
 const dropTarget = this.findDropTarget(drag,x,y)

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
    try{
        this.canvas?.releasePointerCapture(event.pointerId)
    } catch(e) {
        console.warn('Failed to release pointer capture', e)
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

    const viewport = this.engine.context.getViewport()
const hitNode = (node) => {
    if(!node) return null
        const nodeY =  (node.worldY ?? node.y ?? 0) - viewport.y;

        // Children should get first chance to handle the click.
        if (node.children) {
            const children = Array.isArray(node.children)
                ? node.children
                : Object.values(node.children).flat();

            // Reverse order so visually topmost/later children win.
            for (let i = children.length - 1; i >= 0; i--) {
                const hit = hitNode(children[i]);

                if (hit) {
                    return hit;
                }
            }
        }

        if (
            node.kind === 'screen' ||
            node.kind === 'header' ||
            node.interactive !== true
        ) {
            return null;
        }

        if (
            x >= node.x &&
            x <= node.x + node.width &&
            y >= nodeY &&
            y <= nodeY + node.height
        ) {
       
            return node;
        }

        return null;}
       let rootNodes

        if (Array.isArray(nodes)) {
            rootNodes = nodes
        } else if (nodes instanceof Map) {
            rootNodes = [...nodes.values()]
        } else if (nodes?.layoutNodes instanceof Map) {
            rootNodes = [
                ...nodes.layoutNodes.values()
            ]
        } else if (nodes?.layoutNodes) {
            rootNodes = Array.isArray(nodes.layoutNodes)
                ? nodes.layoutNodes
                : Object.values(nodes.layoutNodes)
        } else {
            rootNodes = []
        }

        for (
            let i = rootNodes.length - 1;
            i >= 0;
            i--
        ) {
            const hit =
                hitNode(rootNodes[i])

            if (hit) {
                return hit
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
findDropTarget(
        dragState,
        pointerX = dragState.x,
        pointerY = dragState.y
    ) {
        const layout =
            this.engine.context.getLayout()

        const viewport =
            this.engine.context.getViewport()

        const dragNode =
            dragState.wordNode

        if (!dragNode) {
            return null
        }

        /*
         * The dragged word follows the pointer by its
         * centre, so create the screen-space rectangle.
         */
        const dragRect = {
            x:
                pointerX -
                dragNode.width / 2,

            y:
                pointerY -
                dragNode.height / 2,

            width: dragNode.width,
            height: dragNode.height
        }

        let dropTarget = null

        const visit = (node) => {
            if (!node || dropTarget) {
                return
            }

            /*
             * Check this node.
             */
            if (
                node.type === 'dragDropGap' &&
                node.interactive === true
            ) {
                const gapRect = {
                    x: node.x,

                    y:
                        (node.worldY ?? node.y ?? 0) -
                        viewport.y,

                    width: node.width,
                    height: node.height
                }

                if (
                    this.rectsOverlap(
                        dragRect,
                        gapRect
                    )
                ) {
                    dropTarget = node
                    return
                }
            }

            /*
             * Then recursively inspect children.
             */
            if (!node.children) {
                return
            }

            const children =
                Array.isArray(node.children)
                    ? node.children
                    : Object.values(node.children)
                        .flat()
                        .filter(Boolean)

            for (const child of children) {
                visit(child)

                if (dropTarget) {
                    return
                }
            }
        }

        let rootNodes

        if (Array.isArray(layout)) {
            rootNodes = layout
        } else if (layout instanceof Map) {
            rootNodes = [...layout.values()]
        } else if (layout?.layoutNodes) {
            rootNodes =
                layout.layoutNodes instanceof Map
                    ? [...layout.layoutNodes.values()]
                    : Object.values(layout.layoutNodes)
        } else {
            rootNodes = []
        }

        /*
         * Search from the visually topmost root.
         */
        for (
            let i = rootNodes.length - 1;
            i >= 0;
            i--
        ) {
            visit(rootNodes[i])

            if (dropTarget) {
                break
            }
        }

        return dropTarget
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