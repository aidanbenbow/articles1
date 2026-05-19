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
        this.pointerState.isDown = true
        this.pointerState.target = event.target
        this.pointerState.x = event.clientX
        this.pointerState.y = event.clientY
       const hit = this.hitTestSystem.hitTest(this.pointerState.x, this.pointerState.y)
        console.log('Pointer down', { pointerState: this.pointerState, hit })
    }
    _onPointerMove = (event) => {
        if (this.pointerState.isDown) {
            this.pointerState.x = event.clientX
            this.pointerState.y = event.clientY
        }
    }
    _onPointerUp = (event) => {
      const hit = this.hitTestSystem.hitTest(this.pointerState.x, this.pointerState.y)
        console.log('Pointer up', { pointerState: this.pointerState, hit })
        this.pointerState.isDown = false
        this.pointerState.target = null
    }
}