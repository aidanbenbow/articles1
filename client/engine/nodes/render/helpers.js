export function rectangle(node, ctx) {
    const x = Number.isFinite(node.x) ? node.x : 0
    const y = Number.isFinite(node.y) ? node.y : 0
    const width = Number.isFinite(node.width) ? node.width : 50
    const height = Number.isFinite(node.height) ? node.height : 50
    const color = node.color || '#2d6cdf'

    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}