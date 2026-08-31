export function layoutOrderingSection(
    articleNode,
    layout,
    section,
    currentY,
    x,
    width,
    padding,
    color,
    lesson
) {
    const questionHeight = 40
    const itemHeight = 45
    const itemGap = 10
    const buttonWidth = 35
    const buttonGap = 8

    const orderingTop = currentY

    const answer =
        lesson.activities[section.id]
       

    const items =
        answer?.items || section.items

    const feedbackHeight =
        answer?.feedback ? 40 : 0

    const feedbackGap =
        feedbackHeight > 0 ? 10 : 0

    const checkButtonHeight = 40
    const checkButtonGap = 15

    const itemsHeight =
        items.length * itemHeight +
        (items.length - 1) * itemGap

    const orderingHeight =
        padding * 2 +
        questionHeight +
        15 +
        itemsHeight +
        checkButtonGap +
        checkButtonHeight +
        feedbackGap +
        feedbackHeight

    const orderingRect = {
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,

        x,
        worldY: orderingTop,
        width,
        height: orderingHeight,

        padding,
        color: '#e0e0e0',

        selected: false,

        question: section.question,

        type: 'ordering',
        kind: 'lessonSection',
        sectionType: 'ordering',

        orderingId: section.id,

        items,

        feedback: answer?.feedback || '',
        feedbackHeight,

        feedbackY:
            orderingTop +
            padding +
            questionHeight +
            15 +
            itemsHeight +
            checkButtonGap +
            checkButtonHeight +
            feedbackGap,

        feedbackX: x + padding,
        feedbackWidth: width - padding * 2
    }

    layout.layoutNodes.set(
        orderingRect.id,
        orderingRect
    )

    // Create each ordering item
    for (let i = 0; i < items.length; i++) {

        const itemY =
            orderingTop +
            padding +
            questionHeight +
            15 +
            i * (itemHeight + itemGap)

        const itemRect = {
            id: `${articleNode.id}-${section.id}-item-${i}`,

            sectionId: section.id,

            x: x + padding,
            worldY: itemY,

            width:
                width -
                padding * 2 -
                buttonWidth -
                buttonGap,

            height: itemHeight,

            padding,

            color: '#d0d0d0',

            selected: false,

            text: items[i],

            type: 'text',
            kind: 'lessonSection',

            sectionType: 'orderingItem',

            orderingId: section.id,

            itemIndex: i
        }

        layout.layoutNodes.set(
            itemRect.id,
            itemRect
        )

        // Up button
        const upButton = {
            id: `${articleNode.id}-${section.id}-up-${i}`,

            sectionId: section.id,

            x:
                x +
                width -
                padding -
                buttonWidth,

            worldY: itemY,

            width: buttonWidth,
            height: 20,

            color: '#bbbbbb',

            type: 'button',
            kind: 'lessonSection',

            sectionType: 'orderingButton',

            action: 'moveOrderingItem',

            orderingId: section.id,

            itemIndex: i,

            direction: 'up'
        }

        layout.layoutNodes.set(
            upButton.id,
            upButton
        )

        // Down button
        const downButton = {
            id: `${articleNode.id}-${section.id}-down-${i}`,

            sectionId: section.id,

            x:
                x +
                width -
                padding -
                buttonWidth,

            worldY:
                itemY + 25,

            width: buttonWidth,
            height: 20,

            color: '#bbbbbb',

            type: 'button',
            kind: 'lessonSection',

            sectionType: 'orderingButton',

            action: 'moveOrderingItem',

            orderingId: section.id,

            itemIndex: i,

            direction: 'down'
        }

        layout.layoutNodes.set(
            downButton.id,
            downButton
        )
    }

    // Check button
    const checkButton = {
        id: `${articleNode.id}-${section.id}-check`,

        sectionId: section.id,

        x: x + padding,

        worldY:
            orderingTop +
            padding +
            questionHeight +
            15 +
            itemsHeight +
            checkButtonGap,

        width: width - padding * 2,
        height: checkButtonHeight,

        color: '#b0b0b0',

        type: 'button',
        kind: 'lessonSection',

        sectionType: 'orderingCheck',

        action: 'checkOrdering',

        orderingId: section.id,

        text: 'Check answer'
    }

    layout.layoutNodes.set(
        checkButton.id,
        checkButton
    )

    return currentY + orderingHeight + 10
}