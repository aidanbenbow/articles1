export function rectangle( ctx, runtime = {}) {
    
    const x = runtime.rect?.x ?? 0
    const y = runtime.rect?.y ?? 0
    const width = runtime.rect?.width ?? 100
    const height = runtime.rect?.height ?? 100
    const color = runtime.style?.color || '#7184a9'
    const borderColor = runtime.style?.borderColor || '#000000'
    const isFocused = runtime.uistate?.focused ?? false
  
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    ctx.strokeStyle = isFocused ? 'red' : borderColor
    ctx.strokeRect(x, y, width, height)
}

export function measureText(node, ctx) {
    if (!ctx) {
        const text = node.text || ""
        return { width: text.length * 10, height: 20 }
    }
    ctx.font = "20px Arial";
    const text = node.text || ""
    const metrics = ctx.measureText(text);
    return { width: metrics.width, height: 20 }
}

export function wrapText(text, maxWidth, font = '16px Arial', ctx) {
        if (!ctx) return [text]
        ctx.font = font
        const words = text.split(' ')
        let line = ''
        const lines = []
        for (const word of words) {
           const testLine = line ? `${line} ${word}` : word
            const metrics = ctx.measureText(testLine)
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line.trim())
                line = word + ' '
            } else {
                line = testLine
            }
        }
        if (line.trim() !== '') lines.push(line.trim())
        return lines
    }