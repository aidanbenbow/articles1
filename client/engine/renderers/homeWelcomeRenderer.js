import { setFont } from "../constants/layoutConstants.js"
import { drawWrappedText } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"
import { renderCard } from "./CardRenderer.js"
import { renderText } from "./TextRenderer.js"

export function renderHomeWelcome( ctx, node, viewport) {

const style = node.style
console.log("style", style)
console.log("node", node)
const { colors, typography,} = style

const {
    radius,
    accentWidth,
    padding,
    contentTop,
    titleTop,
    sectionGap,
    statHeight,
    statGap,
    statRadius,
    statPaddingX,
    promptGap,
    promptHeight,
    stepCircleRadius,
    stepCircleOffsetX,
    stepTextOffsetX,
    stepHeight,
    titleFontSize,
    bodyFontSize,
    stepFontSize,
    shadowBlur,
    shadowOffsetY,
    borderWidth,
    connectorColor
} = style
    const rect =  getScreenPosition(node, viewport)
    if (!rect)  return
    
    const { x, y,} = rect
const width = node.width || 600
const height = node.height || 160
    renderCard(ctx, node, viewport, style)
  
    // ctx.save()
    // ctx.beginPath()
    // ctx.roundRect(   x,   y,   accentWidth,   height,   radius)
    // ctx.fillStyle = colors.accent
    // ctx.fill()
    // ctx.restore()
    /*
     * ==================================================
     * CONTENT
     * ==================================================
     */
    
//     const contentX =   x + padding + accentWidth
//     const contentWidth =   width - padding * 2 - accentWidth
//     /*
//      * ==================================================
//      * TITLE
//      * ==================================================
//      */
//     // setFont(ctx, typography, 'title')
//     // ctx.fillStyle = colors.heading
//     // ctx.fillText( node.title || 'Welcome',  contentX,  y + titleTop)
//     renderText(ctx, { ...node, text: node.title, typography: 'title' }, viewport, typography)
   
// const lines = (node.text || "")
//         .split("\n")
//         .map(line => line.trim())
//         .filter(Boolean)

//         const stats = lines
//         .filter(line => line.startsWith("•"))
//         .map(line => line.replace(/^•\s*/, ""))

//         const prompt = lines.find(line =>
//         line.startsWith("What would you like")
//     )

// let currentY = y + contentTop + titleFontSize + sectionGap

// // SECTION HEADING
//     setFont(ctx, typography, 'sectionHeading')
//     ctx.fillStyle = colors.sectionHeading
//     ctx.fillText("Your learning progress", contentX, currentY)

//     currentY += sectionGap

//     // INDIVIDUAL STATISTIC ROWS
//     stats.forEach((stat, index) => {
//         const [label, ...valueParts] = stat.split(":")
//         const value = valueParts.join(":").trim()

//         // Subtle row background
//         ctx.beginPath()
//         ctx.roundRect(
//             contentX,
//             currentY,
//             contentWidth,
//             statHeight,
//             statRadius
//         )
//         ctx.fillStyle = index % 2 === 0 ? colors.statBackground : colors.surface
//         ctx.fill()

//         // Statistic label
//         setFont(ctx, typography, 'body')
//         ctx.fillStyle = colors.muted
//         ctx.textAlign = "left"
//         ctx.textBaseline = "middle"
//         ctx.fillText(label.trim(), contentX + statPaddingX, currentY + statHeight / 2)

//         // Statistic value
//         setFont(ctx, typography, 'body')
//         ctx.fillStyle = colors.heading
//         ctx.textAlign = "right"
//         ctx.fillText(
//             value,
//             contentX + contentWidth - statPaddingX,
//             currentY + statHeight / 2
//         )

//         currentY += statHeight + statGap
//     })

//     // LEARNING PROMPT
//     if (prompt) {
//         currentY += promptGap

//         setFont(ctx, typography, 'sectionHeading')
//         ctx.fillStyle = colors.sectionHeading
//         ctx.textAlign = "left"
//         ctx.textBaseline = "top"
//         ctx.fillText(prompt, contentX, currentY)

//         currentY += promptHeight
//     }
//      // LEARNING FLOW
//     const instructionLines = (node.instructions || "")
//         .split("\n")
//         .map(line => line.trim())
//         .filter(Boolean)

//     const steps = instructionLines
//         .filter(line => /^\d+\./.test(line))
//         .map(line => line.replace(/^\d+\.\s*/, ""))

//     if (steps.length) {
//         currentY += sectionGap

//         setFont(ctx, typography, 'sectionHeading')
//         ctx.fillStyle = colors.accent
//         ctx.textAlign = "left"
//         ctx.textBaseline = "top"
//         ctx.fillText("HOW IT WORKS", contentX, currentY)

//         currentY += sectionGap

//         steps.forEach((step, index) => {
//             const circleX = contentX + stepCircleOffsetX
//             const circleY = currentY + stepHeight / 2

//             // Numbered circle
//             ctx.beginPath()
//             ctx.arc(
//                 circleX,
//                 circleY,
//                 stepCircleRadius,
//                 0,
//                 Math.PI * 2
//             )

//             ctx.fillStyle = index === 0
//                 ? colors.accent
//                 : colors.accentLight
//             ctx.fill()

//             setFont(ctx, typography, 'step')
//             ctx.fillStyle = index === 0
//                 ? colors.surface
//                 : colors.accent
//             ctx.textAlign = "center"
//             ctx.textBaseline = "middle"
//             ctx.fillText(String(index + 1), circleX, circleY)

//             // Step label
//             setFont(ctx, typography)
//             ctx.fillStyle = colors.text
//             ctx.textAlign = "left"
//             ctx.textBaseline = "middle"
//             ctx.fillText(
//                 step,
//                 contentX + stepTextOffsetX,
//                 circleY
//             )

//             // Vertical connector
//             if (index < steps.length - 1) {
//                 ctx.beginPath()
//                 ctx.moveTo(circleX, circleY + stepCircleRadius)
//                 ctx.lineTo(
//                     circleX,
//                     currentY + stepHeight
//                 )
//                 ctx.strokeStyle = connectorColor
//                 ctx.lineWidth = borderWidth
//                 ctx.stroke()
//             }

//             currentY += stepHeight
//         })
//     }

//     ctx.restore()
}


