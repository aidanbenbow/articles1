// layoutConstants.js

export const LAYOUT = {
    padding: 20,
    spacingY: 30,
    articleWidth: 600,
    inputGap: 80,
    buttonGap: 160,
    marginTop: 20
}

// layoutHelpers.js

export function getNodeStyle(node) {
    const props = node?.props ?? {}
    const size = props.size ?? {}

    return {
        width: size.width ?? 200,
        height: size.height ?? 50,
        color: props.color ?? "#000000"
    }
}

// layoutHelpers.js

export function createRect({
    x,
  id,
    width,
    height,
    color,
    type,
    kind,
    worldY=0,
    ...rest
}) {
    return {
        x,
       id, 
        width,
        height,
        worldY,
        color,
        type,
        kind,
        selected: false,
        ...rest
    }
}

export function layoutVerticalList(nodes, options) {
    const {
        startX,
        startY,
        spacing = 0,
        getItemHeight,
        create
    } = options

    const rects = new Map()
    let currentY = startY

    nodes.forEach((node) => {
        const height = getItemHeight ? getItemHeight(node) : 0
        const rect = create(node, currentY, startX)
        rects.set(node.id, rect)
        currentY += height + spacing
    })

    return rects
}