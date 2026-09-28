import { createButtonNode } from "./nodeFactories/buttonNode.js"

export function layoutContinueButton(articleNode,layout, currentY, x, width, padding, color) {
    const buttonHeight = 40
    const buttonRect = createButtonNode({
        id: `${articleNode.id}-continue-button`,
        sectionId: 'continue-button',
        x,
        worldY: currentY,
        width,
        height: buttonHeight,
        padding,
        color: color || '#23979d',
        selected: false,
        text: 'Continue',
        type: 'button',
        kind: 'lessonSection',
        sectionType: 'continueButton',
        action: 'advanceLessonSection'
    })
    // const buttonRect = {
    //     id: `${articleNode.id}-continue-button`,
    //     sectionId: 'continue-button',
    //     x,
    //     worldY: currentY,
    //     width,
    //     height: buttonHeight,
    //     padding,
    //     color: '#23979d',
    //     selected: false,
    //     text: 'Continue',
    //     type: 'button',
    //     kind: 'lessonSection',
    //     sectionType: 'continueButton',
    //     action: 'advanceLessonSection'
    // }
    layout.layoutNodes.set(buttonRect.id, buttonRect)
    return currentY + buttonHeight + 10
}