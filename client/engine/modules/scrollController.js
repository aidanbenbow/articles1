export class ScrollController {
    constructor({ getCanvas, onDelta }) {
        this.getCanvas = getCanvas
        this.onDelta = onDelta
        this._touchStart = 0

        this._onWheel = this._onWheel.bind(this)
        this._onTouchMove = this._onTouchMove.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
    }

    attach() {
        const canvas = this.getCanvas?.()
        if (!canvas) return

        canvas.addEventListener('wheel', this._onWheel, { passive: false })
        canvas.addEventListener('touchmove', this._onTouchMove, { passive: false })
        canvas.addEventListener('touchend', this._onTouchEnd, { passive: false })
        canvas.addEventListener('touchcancel', this._onTouchEnd, { passive: false })
    }

    detach() {
        const canvas = this.getCanvas?.()
        if (!canvas) return

        canvas.removeEventListener('wheel', this._onWheel)
        canvas.removeEventListener('touchmove', this._onTouchMove)
        canvas.removeEventListener('touchend', this._onTouchEnd)
        canvas.removeEventListener('touchcancel', this._onTouchEnd)
    }

    _onWheel(event) {
        event.preventDefault()
        this.onDelta?.(event.deltaY)
    }

    _onTouchMove(event) {
        event.preventDefault()
        if (event.touches.length !== 1) return

        const currentY = event.touches[0].clientY
        if (this._touchStart === 0) {
            this._touchStart = currentY
            return
        }

        const deltaY = currentY - this._touchStart
        this._touchStart = currentY
        this.onDelta?.(deltaY)
    }

    _onTouchEnd() {
        this._touchStart = 0
    }
}