export class UIState {
    constructor(engine) {
        this.engine = engine
        this.states = new Map()
    }

    set(nodeId, updates) {
        if(!nodeId) return
        const previous = this.get(nodeId)
        const next = { ...previous, ...updates }

        if (
            Object.keys(updates).every(
                key => previous[key] === updates[key]
            )
        ) return

        this.states.set(nodeId, next)
        this.engine.emit('uiStateChanged', {
            nodeId,
            state: next
        })
    }

    get(nodeId) {
        return this.states.get(nodeId) ?? {}
    }

    setHover(nodeId, hovered) {
        this.set(nodeId, { hover: hovered })
    }
setPressed(nodeId, value) {
        this.set(nodeId, { pressed: value })
    }
    isHovered(nodeId) {
        return this.get(nodeId).hover === true
    }

    clear(nodeId) {
        this.states.delete(nodeId)
    }
}