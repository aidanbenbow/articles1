export function writeText(ctx, text, x, y) {
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}

export function addKeyboardListener(inputBox, engine) {
    inputBox.props.content = { text: '' }
    window.addEventListener('keydown', (event) => {
        if (event.key.length === 1) {
            inputBox.props.content.text = (inputBox.props.content.text || "") + event.key;
            engine.emit('nodeUpdated', { nodeId: inputBox.id, props: { content: { text: inputBox.props.content.text } } })
        } else if (event.key === 'Backspace') {
            inputBox.props.content.text = (inputBox.props.content.text || "").slice(0, -1);
            engine.emit('nodeUpdated', { nodeId: inputBox.id, props: { content: { text: inputBox.props.content.text } } })
        }
        
    });
}