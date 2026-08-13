export function layoutBackButton(articleNode, layout, currentY, x, width, padding, color) {
    const buttonHeight = 40

    const backRect = {
        id: `${articleNode.id}-back-button`,
        sectionId: 'back-button',
        x,
        worldY: currentY,
        width,
        height: buttonHeight,
        padding,
        color: '#23979d',
        selected: false,
        text: 'Back',   
        type: 'button',
        kind: 'lessonSection',
        sectionType: 'backButton',
        action: 'returnToStartScreen'
    }
layout.layoutNodes.set(backRect.id, backRect)
    return backRect
}