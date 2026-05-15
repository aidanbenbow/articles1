export function rectangle(node, ctx) {
    const x = node.layouted?.x ?? node.x ?? 0
    const y = node.layouted?.y ?? node.y ?? 0
    const width = node.layouted?.width ?? node.measured?.width ?? node.width ?? 100
    const height = node.layouted?.height ?? node.measured?.height ?? node.height ?? 100
    const color = node.color || '#2d6cdf'
//console.log('rectangle', { x, y, width, height, color })
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
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