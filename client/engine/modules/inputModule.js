import { baseModule } from "./baseModule.js";
import { HitTestSystem } from "./hitTestSystem.js";

export class InputModule extends baseModule{
    static moduleName = 'inputModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'inputModule'
        this.canvas = null
        this.pointerState = {
            isDown: false,
            target: null,
            x: 0,
            y: 0,
        }

        this.hitTestSystem = null
    }
    attach() {
        this.canvas = this.context?.canvas
        if (this.canvas) {
            this.canvas.addEventListener('pointerdown', this._onPointerDown)
            this.canvas.addEventListener('pointermove', this._onPointerMove)
            this.canvas.addEventListener('pointerup', this._onPointerUp)
        }
        this._hitTestSystem() // initialize hit test system
    }
    detach() {
        if (this.canvas) {
            this.canvas.removeEventListener('pointerdown', this._onPointerDown)
            this.canvas.removeEventListener('pointermove', this._onPointerMove)
            this.canvas.removeEventListener('pointerup', this._onPointerUp)
        }
    }
_hitTestSystem() {
        if (!this.hitTestSystem) {
            this.hitTestSystem = new HitTestSystem(this.context)
        }
        return this.hitTestSystem
    }
    _onPointerDown = (event) => {
        const { x, y } = this._normalisePointerEvent(event)
        const hit = this.hitTestSystem.hitTest(x, y)
        this.pointerState.isDown = true
        this.pointerState.x = x
        this.pointerState.y = y
        this.pointerState.target = hit
        console.log('[InputModule] pointer down',   hit.id )
            if (hit) {
                this.context.setFocusedNode?.(hit.id)
            } else {
                this.context.clearFocusedNode?.()
            }
    }
    _onPointerMove = (event) => {
        if (this.pointerState.isDown) {
            const { x, y } = this._normalisePointerEvent(event)
            this.pointerState.x = x
            this.pointerState.y = y
        }
    }
    _onPointerUp = (event) => {
      const hit = this.hitTestSystem.hitTest(this.pointerState.x, this.pointerState.y)
    
        this.pointerState.isDown = false
        this.pointerState.target = null
    }
    _normalisePointerEvent(event) {
        const rect = this.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return { x, y }
    }
}