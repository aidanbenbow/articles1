import{createDragDropWordNode} from '../nodeFactories/dragDropWordNode.js'
import{measureText} from '../../helpers/textMeasure.js'
import{resolveValue} from '../builders/resolveValue.js'

export function buildDragDropNode(config, context) {
const{metrics,owner,currentY} = context
const dragDrop = metrics.dragDrop
const text = String(resolveValue(config.text ?? config.value, context) ?? '')
const textWidth = measureText(text, context.typography?.body)
const paddingX = dragDrop.wordPaddingX
const width = Math.max(dragDrop.wordMinWidth, textWidth + paddingX * 2)
const x = resolveValue(config.x, context) ?? context.contentX
const worldY = resolveValue(config.worldY, context) ?? currentY
const nodeWidth = resolveValue(config.width, context) ?? width
const nodeHeight = resolveValue(config.height, context) ?? dragDrop.wordHeight
const node = createDragDropWordNode({
    id: config.id,
    owner: config.owner??owner,
    sectionId: context.section?.id,
    dragDropId: context.section?.id,
    wordIndex: resolveValue(config.wordIndex, context),
    text,
    x: x,
    worldY: worldY,
    width: nodeWidth,
    height: nodeHeight,
    color: resolveValue(config.color, context)??'#23979d',
    kind: config.kind??'lessonSection',
    sectionType: 'dragDropWord',
})

return {
    node,
    currentY: node.worldY + node.height + dragDrop.wordGap,
}
}