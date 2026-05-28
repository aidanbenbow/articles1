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
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
      },
      layout: {
        direction: props.direction ?? 'column',
        gap: props.gap ?? 0,
        flexGrow: props.flexGrow ?? 1,
        flexBasis: props.flexBasis ?? 0,
        flexShrink: props.flexShrink ?? 1,
        alignItems: props.alignItems ?? 'start',
        justifyContent: props.justifyContent ?? 'start',

      },

      box: {
        padding: props.padding ?? 0,
        paddingX: props.paddingX ?? props.padding ?? 0,
        paddingY: props.paddingY ?? props.padding ?? 0,
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