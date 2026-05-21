export function registerCommands(engine) {
    engine.registerCommand('focusNode', ({ nodeId }) => {
        return {
            updates: [
                { nodeId,
                    patch: {
                        uistate: { focused: true }
                    }
                }
            ]
        }
    })

    engine.registerCommand('keypress', ({ nodeId, key }) => {
        const node = engine.state.nodes.get(nodeId)
        if (!node) {
            console.warn(`[focusNode] node "${nodeId}" not found`)
            return
        }
        return {
            updates: [
                { nodeId,
                    patch: {
                        props: { text: (node.props.text ?? '') + key }
                    }
                }
            ]
        }
    })
}