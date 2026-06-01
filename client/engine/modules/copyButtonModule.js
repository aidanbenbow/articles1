import { baseModule } from "./baseModule.js";

export class CopyButtonModule extends baseModule {
    static moduleName = 'copyButtonModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'copyButtonModule'
        this.lastCopyableInputId = null
    }

    attach() {
        this.engine.on('focusChanged', this._onFocusedNodeChanged)
        this.engine.on('copyRequested', this._onCopyButtonClick)
    }

    detach() {
        this.engine.off('focusChanged', this._onFocusedNodeChanged)
        this.engine.off('copyRequested', this._onCopyButtonClick)
    }

    _onFocusedNodeChanged = ({ nodeId }) => {
        const isCopyableNode = nodeId === 'messageInputNode' || nodeId === 'reportInputNode'
        if (isCopyableNode) {
            this.lastCopyableInputId = nodeId
        } 
        console.log(`[CopyButtonModule] Focus changed to ${nodeId}, copyable: ${isCopyableNode}`)
       
        
    }

    _onCopyButtonClick = ({ id }) => {
        
          if (id !== 'copyButtonNode' || !this.lastCopyableInputId) return
            const inputNode = this.context.getNode(this.lastCopyableInputId)
            const text = inputNode?.props.content?.value || ''
            console.log(inputNode)
            if (text) {
                navigator.clipboard.writeText(text)
                console.log('Copied:', text)
            }
        
    }
}