export function parseDragDrop(lines, startIndex) {
     const dragdrop = {
        type: 'dragdrop',
        id: '',
        instruction: '',
        wordbank: [],
        answers: {},
        paragraphs: []
    }

    let i = startIndex + 1

    while (i < lines.length) {
        const text = lines[i].trim()
        if (text === ':::') {
            break
        }

        if (text.startsWith('id:')) {
            dragdrop.id = text.substring('id:'.length).trim()
        } else if (text.startsWith('instruction:')) {
            dragdrop.instruction = text.substring('instruction:'.length).trim()
        } else if (text.startsWith('wordbank:')) {
            const wordbankText = text.substring('wordbank:'.length).trim()
            dragdrop.wordbank = wordbankText.split('|').map(word => word.trim())
        } else if (text.startsWith('text:')) {
            const paragraphText = text.substring('text:'.length).trim()
            dragdrop.paragraphs.push(paragraphText)
        } else if (text.startsWith('answers:')) {
            const answersText = text.substring('answers:'.length).trim()
            dragdrop.answers = Object.fromEntries(
                answersText.split('|').map(pair => {
                    const [key,...valueParts] = pair.split('=')
                    const value = valueParts.join('=').trim()
                    return [key.trim(), value]
                })
            )
        }
        i++
    }
    return {
        dragdrop,
        nextIndex: i
    }

}