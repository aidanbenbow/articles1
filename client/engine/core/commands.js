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

    engine.registerCommand('setReport', (context, { report }) => {
        console.log('Setting report in context:', report)
        return {
            updates: [
                { nodeId: 'reportInputNode',
                   patch: {
  props: {
    content: { value: report ? `${report.report}` : 'No report available' },
  }
}                },
{ nodeId: 'messageInputNode',
                   patch: {
  props: {
    content: { value: report ? `${report.message}` : 'No message available' },
  }
}                },
{ nodeId: 'inputNode',
                   patch: {
  props: {
    content: { value: report ? `${report.name}` : 'No name available' },
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