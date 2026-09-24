// layoutConstants.js

export const LAYOUT = {
    padding: 20,
    
    articleWidth: 600,
    inputGap: 80,
    buttonGap: 160,
    

    minPadding: 16,
    maxPadding: 40,
    minContentWidth: 280,
    maxContentWidth: 760,
    minContentHeight: 400,
    maxContentHeight: 1200,
    spacingY: 24,
    marginTop: 24,
    breakPoints: {
        compact: 420,
        mobile: 520,
        tablet: 768,
    },
    colors: {
        surface: "#ffffff",
        border: "#e5e7eb",
        accent: "#9481ed",
        accentLight: "#f0eefc",
        heading: "#171717",
        text: "#4b5563",
        muted: "#6b7280",
        sectionHeading: "#374151",
        statBackground: "#f9fafb",
        shadow: "rgba(0, 0, 0, 0.08)",
    },

    typography: {
    family: "sans-serif",

    eyebrow: {
        size: 11,
        lineHeight: 16,
        weight: 600,
    },

    title: {
        size: 26,
        lineHeight: 32,
        weight: 700,
    },

    sectionHeading: {
        size: 14,
        lineHeight: 20,
        weight: 600,
    },

    body: {
        size: 13,
        lineHeight: 20,
        weight: 400,
    },

    step: {
        size: 12,
        lineHeight: 18,
        weight: 400,
    },
    question: {
        size: 14,
        lineHeight: 20,
        weight: 400,
    },

    weights: {
        regular: 400,
        medium: 600,
        bold: 700,
    }
},

    welcome: {
        radius: 20,
        accentWidth: 7,

        padding: 28,
        contentTop: 23,
        titleTop: 45,
        sectionGap: 27,

        statHeight: 29,
        statGap: 3,
        statPaddingX: 10,
        statRadius: 6,

        promptGap: 8,
        promptHeight: 29,

        stepCircleRadius: 10,
        stepCircleOffsetX: 12,
        stepTextOffsetX: 32,
        stepHeight: 25,
        shadowBlur: 16,
shadowOffsetY: 5,
borderWidth: 1,
connectorColor: "#e5e7eb"

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

export function setFont(ctx, typography, role) {
    const style = typography[role]

    if (!style) return

    ctx.font = `${style.weight} ${style.size}px ${typography.family}`
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

    const contentHeight = Math.min(
        LAYOUT.maxContentHeight,
        screenHeight - padding * 2
    )

    const optionWidth = 60
    const optionHeight = 30

    return {
        screenWidth,
        screenHeight,

        compact,
        mobile,
        tablet,

        padding,
        contentWidth,
        contentHeight,
        optionWidth,
        optionHeight,

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
        compact ? 380 :
        mobile ? 360 :
        tablet ? 340 :
        320,

    padding: compact ? 20 : LAYOUT.welcome.padding,

    radius: LAYOUT.welcome.radius,
    accentWidth: LAYOUT.welcome.accentWidth,

    contentTop: LAYOUT.welcome.contentTop,
    titleTop: LAYOUT.welcome.titleTop,
    sectionGap: LAYOUT.welcome.sectionGap,

    statHeight: LAYOUT.welcome.statHeight,
    statGap: LAYOUT.welcome.statGap,
    statPaddingX: LAYOUT.welcome.statPaddingX,

    promptGap: LAYOUT.welcome.promptGap,
    promptHeight: LAYOUT.welcome.promptHeight,

    stepCircleRadius: LAYOUT.welcome.stepCircleRadius,
    stepCircleOffsetX: LAYOUT.welcome.stepCircleOffsetX,
    stepTextOffsetX: LAYOUT.welcome.stepTextOffsetX,
    stepHeight: LAYOUT.welcome.stepHeight,

    titleFontSize: compact ? 22 : LAYOUT.typography.title,
    bodyFontSize: compact ? 12 : LAYOUT.typography.body,
    stepFontSize: compact ? 11 : LAYOUT.typography.step,
},
lessonIntro: {
    titleHeight: compact ? 52 : 60,
    descriptionHeight: compact ? 72 : 60,
    statsHeight: 30,
    gap: compact ? 12 : 16,
    statsGap: compact ? 16 : 20
},
button:{
height: compact ? 32 : 40,
},
        suggested: {
            height:
                compact ? 150 :
                mobile ? 120 :
                170
        },

        browseAll: {
            height: 64
        },
         dragDrop: {
            instructionHeight: compact ? 32 : 36,

            wordHeight: compact ? 32 : 36,

            wordGap: compact ? 6 : 8,

            wordPaddingX: compact ? 8 : 12,

            wordMinWidth: compact ? 65 : 80,

            paragraphLineHeight: compact ? 38 : 42,

            paragraphGap: compact ? 3 : 5,

            gapWidth: compact ? 90 : 110,

            gapHeight: compact ? 28 : 32,

            checkButtonHeight: compact ? 36 : 40,

            checkButtonGap: compact ? 12 : 15,

            feedbackHeight: compact ? 36 : 40,

            feedbackGap: compact ? 8 : 10,

            sectionGap: compact ? 16 : 25
        },
        heading: {
    height: compact ? 40 : 45,
    gap: compact ? 8 : 10
},
survey: {
    padding: compact ? 14 : 20,

    questionHeight: compact ? 42 : 50,
    responseHeight: compact ? 24 : 30,

    optionHeight: compact ? 36 : 42,
    optionGap: compact ? 8 : 10,

    feedbackHeight: compact ? 36 : 40,
    feedbackGap: compact ? 8 : 10,

    responseWidth: compact ? 80 : 100,

    sectionGap: compact ? 12 : 16
}
    }
}