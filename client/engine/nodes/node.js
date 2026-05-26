export class Node {
  constructor(id, type, props = {}) {
    this.id = id
    this.type = type
    this.zIndex = props.zIndex ?? 0

    // layout + visual intent only
    this.props = {
      size: {
        width: props.width,
        height: props.height,
        minWidth: props.minWidth,
        minHeight: props.minHeight,
      },
      layout: {
        proportion: props.proportion ?? 1,
      x: props.x ?? 0,
      order: props.order ?? 0,
      },

      position: {
        x: props.x ?? 0,
        y: props.y ?? 0,
      },

      spacing: {
        padding: props.padding ?? 0,
        paddingX: props.paddingX ?? props.padding ?? 0,
        paddingY: props.paddingY ?? props.padding ?? 0,
        gap: props.gap ?? 10,
        offsetX: props.offsetX ?? 10,
        offsetY: props.offsetY ?? 10,
      },

      style: {
        color: props.color ?? '#2d6cdf',
        borderColor: props.borderColor ?? '#000000',
      },

      content: {
        value: props.value ?? '',
        placeholder: props.placeholder ?? '',
       
      },
      uistate: {
        focused: false,
        caretIndex: 0,
        hidden: false,

      },
    }

    // structure only
    this.parentId = null
    this.children = []
  }
}