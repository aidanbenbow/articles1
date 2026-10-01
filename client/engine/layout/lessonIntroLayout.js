import { createButtonNode } from "./nodeFactories/buttonNode.js"
import { createCardNode } from "./nodeFactories/cardNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"

export function layoutLessonIntro(
    layout,
    articleNode,
    lesson,
    currentY,
    x,
    width,
    padding,
    color,
    responsive
) {
    const titleHeight =
        responsive.lessonIntro.titleHeight

    const descriptionHeight =
        lesson.description
            ? responsive.lessonIntro.descriptionHeight
            : 0

    const gap =
        responsive.lessonIntro.gap

    const children = {
        title: createTextNode({
            id: `${articleNode.id}-title`,
            sectionId: 'title',
            x,
            worldY: currentY,
            width,
            height: titleHeight,
            color,
            text: lesson.title,
            kind: 'lessonTitle',
            padding: 0,
            typography: 'title'
        })
    }

    currentY += titleHeight + gap

    if (lesson.description) {
        children.description = createTextNode({
            id: `${articleNode.id}-description`,
            sectionId: 'description',
            x,
            worldY: currentY,
            width,
            height: descriptionHeight,
            color,
            text: lesson.description,
            kind: 'lessonDescription',
            padding,
            typography: 'body'
        })

        currentY += descriptionHeight + gap
    }

    const lessonTotal =
        lesson.lessonTotal || 0

    const quizCount =
        lesson.quizTotal || 0

    const surveyCount =
        lesson.surveyTotal || 0

    const stats = [
        `${lessonTotal} learning blocks`,
        `${quizCount} quizzes`,
        `${surveyCount} surveys`
    ]
        .filter(Boolean)
        .join(' • ')

    children.stats = createTextNode({
        id: `${articleNode.id}-stats`,
        sectionId: 'stats',
        x,
        worldY: currentY,
        width,
        height: responsive.lessonIntro.statsHeight,
        color,
        text: stats,
        kind: 'lessonStats',
        padding:0,
        typography: 'body'
    })

    currentY +=
        responsive.lessonIntro.statsHeight + gap

    const button = createButtonNode({
        id: `${articleNode.id}-start-button`,
        sectionId: 'startButton',
        x,
        worldY: currentY,
        width,
        height: responsive.button.height,
        color,
        text: 'Start Lesson',
        kind: 'lessonStartButton',
        padding,
        typography: 'button',
        action: 'startLessonPhase'
    })

    children.startButton = button

   

    const introNode = createCardNode({
        id: `${articleNode.id}-intro`,
        type: 'lessonIntro',
        sectionId: articleNode.id,
        x,
        worldY: children.title.worldY,
        width,
        height: currentY - children.title.worldY,
        color: null,
        padding: 0,
        kind: 'lessonIntro',
        children
    })

    layout.layoutNodes.set(
        introNode.id,
        introNode
    )

    return currentY
}