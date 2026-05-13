import { resizeCanvas } from "./resizecanvas.js";

const width = window.innerWidth
const height = window.innerHeight

const mainCanvas = document.querySelector('#mainCanvas')

export function setupCanvas() {
    if (!mainCanvas) {
        console.warn('[CanvasManager] Main canvas not found')
        return null
    }
resizeCanvas(mainCanvas, width, height)
    return {
        ctx: mainCanvas.getContext('2d'),
        canvas: mainCanvas
    }
}
