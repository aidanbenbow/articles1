import { baseModule } from "./baseModule.js";

export class PasteButtonModule extends baseModule {
    static moduleName = 'pasteButtonModule'
    static lifeCycleModule = true
    constructor(engine) {
        super(engine)
        this.id = 'pasteButtonModule'
        this.lastPasteableInputId = null
    }
    attach() {
        this.engine.on('focusChanged', this._onFocusedNodeChanged)
        this.engine.on('pasteRequested', this._onPasteButtonClick)
    }
    detach() {
        this.engine.off('focusChanged', this._onFocusedNodeChanged)
        this.engine.off('pasteRequested', this._onPasteButtonClick)
    }
    _onFocusedNodeChanged = ({ nodeId }) => {
        const isPasteableNode = nodeId === 'messageInputNode' || nodeId === 'reportInputNode'
        console.log(`[PasteButtonModule] Focus changed to ${nodeId}, pasteable: ${isPasteableNode}`)
        if (isPasteableNode) {
            this.lastPasteableInputId = nodeId
        }
    }

    _onPasteButtonClick = async ({ id }) => {
        console.log(`[PasteButtonModule] Paste button clicked: ${id}`)

        if (id !== 'pasteButton'|| !this.lastPasteableInputId) return
        try {
            const text = await navigator.clipboard.readText()
            console.log('Pasted:', text)
                const focusedNodeId = this.lastPasteableInputId
            if (focusedNodeId === 'messageInputNode' || focusedNodeId === 'reportInputNode') {
                const inputNode = this.context.getNode(focusedNodeId)
                
               
                this.engine.dispatch({ type: 'setMessage', payload: { message: text } })
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err)
        }
    }

}