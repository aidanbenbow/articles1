import { layoutDragDropParagraph } from "../dragDropParagraphLayout.js"
import { resolveValue } from "./resolveValue.js"

export function buildDragDropParagraphNode(config, context) {
    const {section, metrics, owner,currentY} = context
    const y = resolveValue(config.worldY, context) ?? currentY
    const x = resolveValue(config.x, context) ?? context.contentX
    const width = resolveValue(config.width, context) ?? context.contentWidth
    const result = layoutDragDropParagraph({
        id: config.id,
        owner: config.owner??owner,
        section,
        paragraph: resolveValue(config.paragraph, context),
        paragraphIndex: resolveValue(config.paragraphIndex, context),
        y: y,
        x: x,
        width: width,
        gapHeight: metrics.dragDrop.paragraphGap,
        answers: resolveValue(config.answers, context)??{},
        metrics,
        typography: context.typography,
    })

    return{
        node: result.node,
        currentY: result.node.worldY+metrics.dragDrop.paragraphGap+result.node.height,
    }
}