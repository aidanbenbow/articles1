export function registerCommands(engine) {
    engine.registerCommand('focusNode', (context,{ nodeId }) => {
        return {
            updates: [
                { nodeId,
                   patch: {
  props: {
    uistate: {
      focused: true
    }
  }
}
                }
            ]
        }
    })

    engine.registerCommand('blurNode', (context,{ nodeId }) => {
        return {
            updates: [
                { nodeId,
                   patch: {
  props: {
    uistate: {
      focused: false
    }
    }
}                }
            ]
        }
    })

    engine.registerCommand('keyPress', (context, { nodeId, key }) => {
        const node = context.getFocusedNode?.()
        if (!node) {
            console.warn(`[keyPress] node "${nodeId}" not found`)
            return
        }
        return {
            updates: [
                { nodeId: node.id,
                    patch: {
                        props: {
                            content:{ value: (node.props.content.value ?? '') + key }
                        }
                    }
                }
            ]
        }
    })
}