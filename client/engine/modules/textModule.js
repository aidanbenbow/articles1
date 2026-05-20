import { drawCaret } from "../text/drawCaret.js";
import { addKeyboardListener } from "../text/writeText.js";
import { baseModule } from "./baseModule.js";

export class TextModule extends baseModule {
    static moduleName = 'textModule'
    static lifeCycleModule = true   
    constructor(engine) {
        super(engine)
        this.id = 'textModule'
    }
    contextExports() {
    }
    attach() {
        this.engine.on('focusChanged', this._onFocusChanged)
        console.log('[TextModule] attached')
    }
    detach() {
        this.engine.off('focusChanged', this._onFocusChanged)
    }
    _onFocusChanged = ({ nodeId }) => {
        const node = this.context.getNode?.(nodeId)
        if (node && node.type === 'inputBox') {
            const newColor = '#ff0000'
            addKeyboardListener(node, this.engine)
           
            this.engine.emit('nodeUpdated', { nodeId, props: { ...node.props, style: { ...node.props.style, borderColor: newColor },  } })
        }
    }
   
}