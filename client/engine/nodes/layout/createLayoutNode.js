export function createLayoutNode(node, rect, children = []) {

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
      color: node.props.style.color,
      borderColor: node.props.style.borderColor ?? '#000000',
    },
    content: {
      value: node.props.content.value ?? '',
      placeholder: node.props.content.placeholder ?? '',
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
    uistate: {
      focused: node.props.uistate?.focused ?? false,
      caretIndex: node.props.uistate?.caretIndex ?? 0,
      hidden: node.props.uistate?.hidden ?? false,
      caretVisible: node.props.uistate?.caretVisible ?? false
    },
    children,
  }
}
