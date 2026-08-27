export function parseOrdering(lines, startIndex) {
    const ordering = {
        type: 'ordering',
        id: '',
        question: '',
        items: [],
        feedback: ''
    }

    let i = startIndex + 1

    while (i < lines.length) {
        const line = lines[i].trim()

        if (line === ':::') {
            break
        }

        if (line.startsWith('id:')) {
            ordering.id = line.substring(3).trim()
        }
        else if (line.startsWith('question:')) {
            ordering.question = line
                .substring('question:'.length)
                .trim()
        }
        else if (line.startsWith('- ')) {
            ordering.items.push(
                line.substring(2).trim()
            )
        }
        else if (line.startsWith('feedback:')) {
            ordering.feedback =
                line.substring('feedback:'.length).trim()
        }

        i++
    }

    return {
        ordering,
        nextIndex: i
    }
}