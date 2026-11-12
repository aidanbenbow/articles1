// layoutConstants.js

import { DESIGN_TOKENS } from "./designTokens.js"
import { getDragDropLayout } from "./LAYOUTS/dragDropLayoutGet.js"
import { getLessonHeaderLayout } from "./LAYOUTS/lessonHeaderLayoutGet.js"
import { getLessonIntroLayout } from "./LAYOUTS/lessonIntroLayoutGet.js"
import { getNameInputLayout } from "./LAYOUTS/nameInputLayout.js"
import { getOrderingLayout } from "./LAYOUTS/orderingLayoutGet.js"
import { getQuizLayout } from "./LAYOUTS/quizLayoutGet.js"
import { getResponsiveReading } from "./LAYOUTS/readingWidth.js"
import { getSurveyLayout } from "./LAYOUTS/surveyLayoutGet.js"
import { getResponsiveTypography } from "./LAYOUTS/typographyLayoutGet.js"



export const LAYOUT =  DESIGN_TOKENS

export function getResponsiveLayout(screenWidth, screenHeight) {

    const {dimensions, typography: baseTypography} = DESIGN_TOKENS

    const compact = screenWidth < dimensions.breakpoints.compact
    const mobile =screenWidth < dimensions.breakpoints.mobile
    const tablet = screenWidth < dimensions.breakpoints.tablet

    const padding = compact
    ? dimensions.minPadding
    : dimensions.padding;

   const contentWidth = screenWidth - padding * 2;
  const contentHeight = screenHeight - padding * 2;

    const optionWidth = 60
    const optionHeight = 30

    const reading = getResponsiveReading(contentWidth)
    const typography = getResponsiveTypography(compact, baseTypography)
    typography.body = {
        ...typography.body,
        size: reading.bodySize,
        lineHeight: Math.max(
    Math.ceil(reading.bodySize * reading.lineHeight),
    Math.ceil(reading.bodySize * 1.3)
  )
    }

    return {
        screenWidth,
        screenHeight,

        compact,
        mobile,
        tablet,

        padding,
        contentWidth,
        contentHeight,

        colors: DESIGN_TOKENS.colors,
    buttonStyles: DESIGN_TOKENS.buttonStyles,
    typography,
        reading,
        optionWidth,
        optionHeight,
        gap: mobile ? 18 : 30,

        
lessonIntro: getLessonIntroLayout(compact),
lessonHeader: getLessonHeaderLayout(compact, mobile),
button:{
height: compact ? 32 : 40,
gap: compact ? 8 : 10,
padding:0
},
   nameInput: getNameInputLayout(compact),
         dragDrop: getDragDropLayout(compact),
        heading: {
    height: compact ? 40 : 45,
    gap: compact ? 8 : 10
},
survey: getSurveyLayout(compact),
ordering: getOrderingLayout(compact),
quiz: getQuizLayout(compact)

    }
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

