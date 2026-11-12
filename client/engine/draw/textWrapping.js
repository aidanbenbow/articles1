// export function getWrappedTextLines(ctx, text, maxWidth) {
//     const paragraphs = String(text ?? '').split(/\n+/)
//     const lines = []
    

//     for (const paragraph of paragraphs) {
//         const words = paragraph.trim().split(/\s+/)
//         let line = ''
// for (const word of words) {
//     if(!word) continue
//         const testLine = line ? `${line} ${word}` : word
//         if (ctx.measureText(testLine).width > maxWidth && line) {
//             lines.push(line)
//             line = word
//         } else {
//             line = testLine
//         }
    
//     }
//     if (line) {
//         lines.push(line)
//     }
// }
//     return lines
// }


export function getWrappedLines(ctx, text, maxWidth) {

    const normalizedText =
        Array.isArray(text)
            ? text.join(' • ')
            : text == null
                ? ''
                : String(text)

    if (!normalizedText.trim()) {
        return []
    }

    if (!Number.isFinite(maxWidth) || maxWidth <= 0) {
        return normalizedText.split(/\n+/)
    }

    const paragraphs = normalizedText.split(/\n+/)
    const lines = []

    for (const paragraph of paragraphs) {

        const words = paragraph.trim().split(/\s+/)

        let line = ''

        for (const word of words) {

            if (!word) continue

            // Handle words wider than the available width
            if (ctx.measureText(word).width > maxWidth) {

                if (line) {
                    lines.push(line)
                    line = ''
                }

                let part = ''

                for (const char of word) {
                    const test = part + char

                    if (
                        ctx.measureText(test).width > maxWidth &&
                        part
                    ) {
                        lines.push(part)
                        part = char
                    } else {
                        part = test
                    }
                }

                line = part
                continue
            }

            const testLine = line
                ? `${line} ${word}`
                : word

            if (
                ctx.measureText(testLine).width > maxWidth &&
                line
            ) {
                lines.push(line)
                line = word
            } else {
                line = testLine
            }
        }

        if (line) {
            lines.push(line)
        }
    }

    return lines
}
