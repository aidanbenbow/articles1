export class LessonController {

    constructor(lessonService, engine) {
        this.lessonService = lessonService
        this.engine = engine
    }


    start(articleId, sections) {

        return this.lessonService.startLesson(articleId, sections)

    }
    setCurrentSection(sectionId) {

    this.lessonService.setCurrentSection(
        sectionId
    )

}


    answerQuiz(
        sectionId,
        quizId,
        optionIndex,
        answer
    ) {

        this.lessonService.answerQuiz(
            sectionId,
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

    getState() {

        return this.lessonService.getLesson()

    }
  updateProgress() {
const viewport = this.engine.context.getViewport()
    const layoutNodes = this.engine.context.getLayout()

    let closest = null

    for(const node of layoutNodes.values()) {

        if(node.kind !== 'lessonSection')
            continue


        if(!this.isVisible(node, viewport))
            continue


        if(!closest || node.worldY < closest.worldY) {
            closest = node
        }

    }


    if(closest) {

        const lesson =
            this.lessonService.getLesson()


        // complete the previous section
        if(
            lesson.currentSectionId &&
            lesson.currentSectionId !== closest.sectionId
        ) {

            this.lessonService.completeSection(
                lesson.currentSectionId
            )

        }


        // move current marker
        this.lessonService.setCurrentSection(
            closest.sectionId
        )
    }

}   isVisible(node, viewport) {

        const nodeTop = node.worldY
        const nodeBottom = node.worldY + node.height

        const viewTop = viewport.y
        const viewBottom = viewport.y + viewport.height

        return (
            nodeBottom > viewTop &&
            nodeTop < viewBottom
        )
    }
    advanceLesson() {
    const moved =
        this.lessonService.lesson.advanceSection()
        if(moved) {
            this.engine.emit('lessonStateChanged', {
                currentSectionId:
                    this.lessonService.lesson.currentSectionId
            })
        }

    return moved

}
   
}
