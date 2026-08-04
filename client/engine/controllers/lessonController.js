export class LessonController {

    constructor(lessonService, engine) {
        this.lessonService = lessonService
        this.engine = engine
    }


    start(articleId, sections) {

        return this.lessonService.startLesson(articleId, sections)

    }


    answerQuiz(
        quizId,
        optionIndex,
        answer
    ) {

        this.lessonService.answerQuiz(
            quizId,
            optionIndex,
            answer
        )

    }


    async answerSurvey(
        surveyId,
        optionIndex
    ) {

        return await this.lessonService.answerSurvey(
            surveyId,
            optionIndex
        )

    }


    completeSection(sectionId) {

        this.lessonService.completeSection(
            sectionId
        )

    }


    getState() {

        return this.lessonService.getLesson()

    }
     updateProgress() {
const viewport = this.engine.context.getViewport()
const layoutNodes = this.engine.context.getLayout()

        for (const node of layoutNodes.values()) {

            if (node.kind !== 'lessonSection') {
                continue
            }

            if (!isVisible(node, viewport)) {
                continue
            }

            switch (node.sectionType) {

                case 'heading':
                case 'paragraph':
                    this.lessonService.completeSection(
                        node.sectionId
                    )
                    break
            }
        }
    }

}

function isVisible(node, viewport) {

    const nodeTop = node.worldY
    const nodeBottom = node.worldY + node.height

    const viewTop = viewport.y
    const viewBottom = viewport.y + viewport.height

    return (
        nodeBottom > viewTop &&
        nodeTop < viewBottom
    )
}