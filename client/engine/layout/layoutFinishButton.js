export function layoutFinishButton(articleNode, layout, currentY, x, width, padding, color) {
    const buttonHeight = 40
    
    const finishRect = {
        id: `${articleNode.id}-finish-button`,
        sectionId: 'finish-button',
        x,
        worldY: currentY,
        width,
        height: buttonHeight,
        padding,
        color: '#23979d',
        selected: false,
        text: 'Finish',
        type: 'button',
        kind: 'lessonSection',
        sectionType: 'finishButton',
        action: 'finishLessonSection'
    }
    layout.layoutNodes.set(finishRect.id, finishRect)
    return currentY + buttonHeight + 10
}