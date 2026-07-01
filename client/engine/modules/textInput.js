export class TextInputModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'textInputModule'
    }
    contextExports() {
        return {
            setMessage: this.setMessage.bind(this),
        }
    }
    setMessage(message) {
        const inputNode = this.engine.context.getNode('messageInputNode')
        if (inputNode) {
            inputNode.text = message
            this.engine.emit('layoutChanged', { layout: this.engine.context.getLayout() })
        }
    }

    attach() {
       window.addEventListener('keydown', this._onKeyDown)
    }
    _onKeyDown = (event) => {
        const inputNode = this.engine.context.getLayout().get('inputNode')
        if(inputNode && inputNode.selected) {
            if (event.key === 'Backspace') {
                inputNode.text = inputNode.text.slice(0, -1)
            } else if (event.key.length === 1) {
                inputNode.text += event.key
            }
            this.engine.emit('layoutChanged', { layout: this.engine.context.getLayout() })
            this.engine.emit('messageChanged', { message: inputNode.text })
        }
}
}