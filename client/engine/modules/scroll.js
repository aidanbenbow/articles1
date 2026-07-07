export class ScrollManager {
    constructor(layout) {
        this.layout = layout
        this.id = 'scrollManager'
        
        this.scrollY = 0
        this.maxScrollY = 0
        this.scrollByView = {
            list: 0,
            article: 0,
        }
    }
    setScroll(y){
        const clamped = Math.max(0, Math.min(y, this.maxScrollY))
if(clamped === this.scrollY) return
this.scrollY = clamped

const view = this.layout.viewState.view
this.scrollByView[view] = this.scrollY
this.layout.init()

    }
    scrollBy(delta){
        this.setScroll(this.scrollY + delta)
    }
    updateBounds(contentHeight){
this.maxScrollY = Math.max(0, contentHeight - this.layout.height)
    }
    getViewport() {
        return {
            x: 0,
            y: this.scrollY,
            width: this.layout.width,
            height: this.layout.height
        }
    }
}