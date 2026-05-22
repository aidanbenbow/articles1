
import { baseModule } from "./baseModule.js";

export class TextModule extends baseModule {
    static moduleName = 'textModule'
    static lifeCycleModule = true   
    constructor(engine) {
        super(engine)
        this.id = 'textModule'

        this.keyActions = {
            ' ': 'insertSpace',
            'Enter': 'insertNewLine',
            'Backspace': 'delChar',
            'Delete': 'delCharNext',
            'ArrowUp': 'moveUp',
            'ArrowDown': 'moveDown',
            'ArrowLeft': 'moveLeft',
            'ArrowRight': 'moveRight',
        }
    }
    contextExports() {
        return {}
    }
    attach() {
        this.engine.on('focusChanged', this._onFocusChanged)
        this.engine.on('keyPress', this._onKeyPress)

          // Register all text commands
        this.engine.registerCommand('insertSpace', this._cmd_insertSpace.bind(this))
        this.engine.registerCommand('insertNewline', this._cmd_insertNewline.bind(this))
        this.engine.registerCommand('deleteChar', this._cmd_deleteChar.bind(this))
        this.engine.registerCommand('deleteCharNext', this._cmd_deleteCharNext.bind(this))
        this.engine.registerCommand('moveUp', this._cmd_moveUp.bind(this))
        this.engine.registerCommand('moveDown', this._cmd_moveDown.bind(this))
        this.engine.registerCommand('moveLeft', this._cmd_moveLeft.bind(this))
        this.engine.registerCommand('moveRight', this._cmd_moveRight.bind(this))
        this.engine.registerCommand('insertText', this._cmd_insertText.bind(this))
        
        console.log('[TextModule] attached')
    }
    detach() {
        this.engine.off('focusChanged', this._onFocusChanged)
        this.engine.off('keyPress', this._onKeyPress)
    }
    _onFocusChanged = ({ nodeId }) => {

         this.engine.dispatch({
            type: 'focusNode',
            payload: { nodeId }
         })
        
    }
    _onKeyPress = ({nodeId, key }) => {
        const action = this.keyActions[key] || (key.length === 1 ? 'insertText' : null)
        if (!action) return
        this.engine.dispatch({
            type: action,
            payload: { nodeId, key }
        })
    }

    // Command handlers
    _cmd_insertSpace(context, payload) {
        const node = context.getFocusedNode()
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        content: {
                            value: node.props.content.value + ' '
                        }
                    }
                }
            }]
        }
    }

    _cmd_insertNewline(context, payload) {
        const node = context.getFocusedNode()
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        content: {
                            value: node.props.content.value + '\n'
                        }
                    }
                }
            }]
        }
    }

    _cmd_deleteChar(context, payload) {
        const node = context.getFocusedNode()
        const text = node.props.content.value
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        content: {
                            value: text.slice(0, -1)
                        }
                    }
                }
            }]
        }
    }

    _cmd_deleteCharNext(context, payload) {
        const node = context.getFocusedNode
        const text = node.props.content.value
        const caretIndex = node.props.uistate.caretIndex
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        content: {
                            value: text.slice(0, caretIndex) + text.slice(caretIndex + 1)
                        }
                    }
                }
            }]
        }
    }

    _cmd_moveUp(context, payload) {
        // Move cursor up logic
        return null
    }

    _cmd_moveDown(context, payload) {
        // Move cursor down logic
        return null
    }

    _cmd_moveLeft(context, payload) {
        const node = context.getFocusedNode
        const caretIndex = node.props.uistate.caretIndex
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        uistate: {
                            caretIndex: Math.max(0, caretIndex - 1)
                        }
                    }
                }
            }]
        }
    }

    _cmd_moveRight(context, payload) {
        const node = context.getFocusedNode()
        const caretIndex = node.props.uistate.caretIndex
        const textLength = node.props.content.value.length
        return {
            updates: [{
                nodeId: node.id,
                patch: {
                    props: {
                        uistate: {
                            caretIndex: Math.min(textLength, caretIndex + 1)
                        }
                    }
                }
            }]
        }
    }

   _cmd_insertText(context, payload) {
    const node = context.getFocusedNode()
    if (!node) return null

    const nextValue = (node.props.content?.value ?? '') + payload.key

    // emit filter event only for the name input
    if (node.id === 'inputNode') {
        this.engine.emit('nameFilterChanged', { query: nextValue })
    }

    return {
        updates: [{
            nodeId: node.id,
            patch: {
                props: {
                    content: { value: nextValue }
                }
            }
        }]
    }
}
}