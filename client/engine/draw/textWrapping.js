export function getWrappedTextLines(ctx, text, maxWidth) {
    const paragraphs = String(text ?? '').split(/\n+/)
    const lines = []
    

    for (const paragraph of paragraphs) {
        const words = paragraph.trim().split(/\s+/)
        let line = ''
for (const word of words) {
    if(!word) continue
        const testLine = line ? `${line} ${word}` : word
        if (ctx.measureText(testLine).width > maxWidth && line) {
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