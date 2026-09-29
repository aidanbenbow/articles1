import { createButtonNode } from "./nodeFactories/buttonNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"
import { createOrderingItemNode } from "./nodeFactories/orderingItemNode.js";
import { createOrderingNode } from "./nodeFactories/orderingNode.js";

export function layoutOrderingSection(
    articleNode,
    layout,
    section,
    currentY,
    x,
    width,
    padding,
    color,
    lesson,
    responsive
) {
    const questionHeight = responsive.ordering.questionHeight
    const itemHeight = responsive.ordering.itemHeight
    const itemGap = responsive.ordering.itemGap
    const buttonWidth = responsive.ordering.buttonWidth
    const buttonGap = responsive.ordering.buttonGap

    const orderingTop = currentY

    const answer = lesson.activities[section.id]
    const hasChecked = answer?.checked === true

const feedback = hasChecked
    ? (answer?.feedback || section.feedback)
    : null
    const items = answer?.items || section.items

    const itemsTop = orderingTop + padding + questionHeight + 15

    const feedbackHeight = feedback ? responsive.ordering.feedbackHeight : 0
        

    const feedbackGap =   feedbackHeight > 0 ? responsive.ordering.feedbackGap : 0

    const checkButtonHeight = responsive.ordering.checkButtonHeight
    const checkButtonGap = responsive.ordering.checkButtonGap
const itemWidth = width - padding * 2 - buttonWidth - buttonGap
const textWidth = itemWidth - padding * 2
    const itemsHeight =
        items.length * itemHeight +
        Math.max(0, items.length - 1) * itemGap
const checkButtonY =
        itemsTop + itemsHeight + checkButtonGap
        const feedbackY =
        checkButtonY + checkButtonHeight + feedbackGap
    const orderingHeight =
        padding * 2 +
        questionHeight +
        15 +
        itemsHeight +
        checkButtonGap +
        checkButtonHeight +
        feedbackGap +
        feedbackHeight
const buttonHeight = itemHeight / 2
const buttonX = x + width - padding - buttonWidth
        const children = {
            question: createTextNode({
                id: `${articleNode.id}-${section.id}-question`,
                sectionId: section.id,
                x: x + padding,
                worldY: orderingTop + padding,
                width: width - padding * 2,
                height: questionHeight,
                color,
                text: section.question,
                kind: 'lessonSection',
    typography: 'question',
                sectionType: 'orderingQuestion',
            }),
            items: [],
            checkButton: null,
            feedback: null
        }

  

    // Create each ordering item
    for (let i = 0; i < items.length; i++) {

        const itemY =
            itemsTop +
            i * (itemHeight + itemGap)

            const item = createOrderingItemNode({
                id: `${articleNode.id}-${section.id}-item-${i}`,
                sectionId: section.id,
                orderingId: section.id,
                itemIndex: i,
                x: x + padding,
                worldY: itemY,
                width: width - padding * 2 - buttonWidth - buttonGap,
                height: itemHeight
            })

            item.children.text = createTextNode({
                id: `${articleNode.id}-${section.id}-item-${i}-text`,
                sectionId: section.id,
                x: x + padding,
                worldY: itemY,
                width: textWidth,
                height: itemHeight,
                color: '#000000',
                text: items[i],
                kind: 'lessonSection',
                sectionType: 'orderingItemText',
                typography: 'body'
            })

            item.children.upButton = createButtonNode({
                id: `${articleNode.id}-${section.id}-up-${i}`,
                sectionId: section.id,
                x: buttonX,
                worldY: itemY,
                width: buttonWidth/2,
                height: buttonHeight,
                color: '#bbbbbb',
                kind: 'lessonSection',
                sectionType: 'orderingButton',
                action: 'moveOrderingItem',
                orderingId: section.id,
                itemIndex: i,
                text: '↑',
                direction: 'up'
            })

            item.children.downButton = createButtonNode({
                id: `${articleNode.id}-${section.id}-down-${i}`,
                sectionId: section.id,
                x: buttonX,
                worldY: itemY + buttonHeight,
                width: buttonWidth/2,
                height: buttonHeight,
                color: '#bbbbbb',
                kind: 'lessonSection',
                sectionType: 'orderingButton',
                action: 'moveOrderingItem',
                orderingId: section.id,
                itemIndex: i,
               text: '↓',
                direction: 'down'
            })
            children.items.push(item)

      
    }

    children.checkButton = createButtonNode({
        id: `${articleNode.id}-${section.id}-check`,
        sectionId: section.id,
        x: x + padding,
        worldY: checkButtonY,
        width: width - padding * 2,
        height: checkButtonHeight,
        color: '#b0b0b0',
        kind: 'lessonSection',
        sectionType: 'orderingCheck',
        action: 'checkOrdering',
        orderingId: section.id,
        text: 'Check answer'
    })

   if(feedback){
    children.feedback = createTextNode({
        id: `${articleNode.id}-${section.id}-feedback`,
        sectionId: section.id,
        x: x + padding,
        worldY: feedbackY,
        width: width - padding * 2,
        height: feedbackHeight,
        color: '#000000',
        text: feedback,
        kind: 'lessonSection',
        sectionType: 'orderingFeedback',
        typography: 'body'
    })          
   }
   const orderingNode = createOrderingNode({
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        orderingId: section.id,
        x,
        worldY: orderingTop,
        width,
        height: orderingHeight,
        padding,
        color,
        children
    })
    layout.layoutNodes.set(orderingNode.id, orderingNode)
   
    return currentY + orderingHeight + 10
}

