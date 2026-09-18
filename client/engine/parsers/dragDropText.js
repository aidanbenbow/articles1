export function parseDragDropText(text) {
    const parts = []
    const regex = /{{(\d+)}}/g

    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {

        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                text: text.substring(lastIndex, match.index)
            })
        }

        parts.push({
            type: 'gap',
            gapIndex: Number(match[1])
        })

        lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            text: text.substring(lastIndex)
        })
    }

    return parts
}