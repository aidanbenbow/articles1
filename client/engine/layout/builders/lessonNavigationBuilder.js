import { lessonButtons } from "../config/lessonButtons.js"
import { createButtonNode } from "../nodeFactories/buttonNode.js"
import { createCardNode } from "../nodeFactories/cardNode.js"

function createLessonButton(
    buttonConfig,
    {
        id,
        x,
        worldY,
        width,
        height,
        padding,
        color
    }
) {
    return createButtonNode({
        id,
        x,
        worldY,
        width,
        height,
        padding,
        color,

        text:
            buttonConfig.text,

        action:
            buttonConfig.action,

        kind:
            buttonConfig.kind,

        sectionType:
            buttonConfig.sectionType,

        type:
            'button'
    })
}

export function buildLessonNavigationNode(config, context) {
    const {
        layout,
        metrics,
        articleNode,
        lesson,
        currentY
    } = context
const x = config.x ?? metrics.padding
const width = config.width ?? metrics.contentWidth
const padding = config.padding?? metrics.button.padding
const height =  metrics.button.height
const gap = metrics.button.gap
const children = {}
let nextY = currentY

if(!lesson.isLastSection()) {
    const button = createLessonButton(
        lessonButtons.continue,
        {
            id: `${articleNode.id}-continue-button`,
            x,
            worldY: nextY,
            width,
            height,
            padding,
            color: config.color
        }
    )

    children.continueButton = button
    nextY += height + gap
} else{
    const finishButton = createLessonButton(
        lessonButtons.finish,
        {
            id: `${articleNode.id}-finish-button`,
            x,
            worldY: nextY,
            width,
            height,
            padding,
            color: config.color
        }
    )
    children.finishButton = finishButton
    nextY += height + gap

    const backButton = createLessonButton(
        lessonButtons.back,
        {
            id: `${articleNode.id}-back-button`,
            x,
            worldY: nextY,
            width,
            height,
            padding,
            color: config.color
        }
    )
    children.backButton = backButton
    nextY = backButton.worldY+height + gap
}

const node = createCardNode({
    id: config.id,
    owner: config.owner ?? 'lesson',
    type: 'lessonNavigation',
    x: config.x ?? metrics.padding,
    worldY: currentY,
    width,
    height: nextY - currentY,
    padding: 0,
    kind: 'lessonNavigation',
    sectionType: 'lessonNavigation',
    children
})
console.log(
    'LESSON NAVIGATION',
    node
)
layout.layoutNodes.set(
    node.id,
    node
)

    return {
        node,
        currentY: nextY
    }
}