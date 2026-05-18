export function createLayoutNode(node, rect, children = []) {
  const proportion = node.props.layout.proportion ?? node.props.layout.propotion ?? 1
  const x = node.props.layout.x ?? 0
  const order = node.props.layout.order ?? 0
  console.log('order', order )
  return {
    id: node.id,
    type: node.type,
    parentId: node.parentId ?? null,
    rect: {
      x: rect?.x ?? 0,
      y: rect?.y ?? 0,
      width: rect?.width ?? 0,
      height: rect?.height ?? 0,
    },
    style: {
      color: node.color,
    },
    proportion,
    x,
    order,
    content: {
      text: node.text ?? '',
    },
    spacing: {
      paddingX: node.paddingX ?? 0,
      paddingY: node.paddingY ?? 0,
      gap: node.gap ?? 0,
      offsetX: node.offsetX ?? 0,
      offsetY: node.offsetY ?? 0,
    },
    debug: {
      paddingX: node.paddingX ?? 0,
      paddingY: node.paddingY ?? 0,
      gap: node.gap ?? 0,
    },
    children,
  }
}
