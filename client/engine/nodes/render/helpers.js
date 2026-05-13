export function rectangle(node, ctx) {
    const x = node.layouted?.x ?? node.x ?? 0
    const y = node.layouted?.y ?? node.y ?? 0
    const width = node.layouted?.width ?? node.width ?? 100
    const height = node.layouted?.height ?? node.height ?? 100
    const color = node.color || '#2d6cdf'

    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}