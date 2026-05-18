export class Node {
  constructor(id, type, props = {}) {
    this.id = id
    this.type = type

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
        gap: props.gap ?? 0,
        offsetX: props.offsetX ?? 0,
        offsetY: props.offsetY ?? 0,
      },

      style: {
        color: props.color ?? '#2d6cdf',
      },

      content: {
        text: props.text ?? ''
      }
    }

    // structure only
    this.parentId = null
    this.children = []
  }

  get color() { return this.props.style.color }
  set color(value) { this.props.style.color = value }

  get text() { return this.props.content.text }
  set text(value) { this.props.content.text = value ?? '' }

  get width() { return this.props.size.width }
  set width(value) { this.props.size.width = value }

  get height() { return this.props.size.height }
  set height(value) { this.props.size.height = value }

  get minWidth() { return this.props.size.minWidth }
  get minHeight() { return this.props.size.minHeight }

  get x() { return this.props.position.x ?? 0 }
  set x(value) { this.props.position.x = value }

  get y() { return this.props.position.y ?? 0 }
  set y(value) { this.props.position.y = value }

  get paddingX() { return this.props.spacing.paddingX ?? this.props.spacing.padding ?? 0 }
  get paddingY() { return this.props.spacing.paddingY ?? this.props.spacing.padding ?? 0 }
  get gap() { return this.props.spacing.gap ?? 0 }
  get offsetX() { return this.props.spacing.offsetX ?? 0 }
  get offsetY() { return this.props.spacing.offsetY ?? 0 }

  get proportion() {
    return this.props.layout.proportion ?? 1
  }

  set proportion(value) {
    const normalized = value ?? 1
    this.props.layout.proportion = normalized
    this.props.layout.propotion = normalized
  }
}