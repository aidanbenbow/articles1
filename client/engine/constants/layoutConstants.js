// layoutConstants.js

export const LAYOUT = {
    padding: 20,
    spacingY: 30,
    articleWidth: 600,
    inputGap: 80,
    buttonGap: 160,
    marginTop: 30,

    minPadding: 16,
    maxPadding: 40,
    minContentWidth: 280,
    maxContentWidth: 760,
    spacingY: 24,
    marginTop: 24,
    breakPoints: {
        compact: 420,
        mobile: 520,
        tablet: 768,
    },
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

export function createRect({ x,id, width, height,color,type,kind,worldY=0,...rest
}) {
    return {x,id, width,height,worldY,color,type,kind,
selected: false,...rest
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

export function getResponsiveLayout(screenWidth, screenHeight) {

    const compact =
        screenWidth < LAYOUT.breakPoints.compact

    const mobile =
        screenWidth < LAYOUT.breakPoints.mobile

    const tablet =
        screenWidth < LAYOUT.breakPoints.tablet

    const padding = Math.max(
        LAYOUT.minPadding,
        Math.min(
            LAYOUT.maxPadding,
            screenWidth * 0.05
        )
    )

    const contentWidth = Math.min(
        LAYOUT.maxContentWidth,
        screenWidth - padding * 2
    )

    return {
        screenWidth,
        screenHeight,

        compact,
        mobile,
        tablet,

        padding,
        contentWidth,

        gap: mobile ? 18 : 30,

        continueCard: {
            height:
                compact ? 220 :
                mobile ? 200 :
                160,

            imageWidth:
                mobile ? 0 : 190,

            imageHeight:
                compact ? 90 :
                mobile ? 105 :
                160
        },

        welcome: {
            height:
                compact ? 160 :
                mobile ? 130 :
                180
        },

        suggested: {
            height:
                compact ? 150 :
                mobile ? 120 :
                170
        },

        browseAll: {
            height: 64
        }
    }
}