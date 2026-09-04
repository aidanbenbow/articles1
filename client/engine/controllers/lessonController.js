export class LessonController {

    constructor(lessonService, engine) {
        this.lessonService = lessonService
        this.engine = engine
    }


    start(lessonData) {
    return this.lessonService.startLesson(lessonData)
    }
    setCurrentSection(sectionId) {
    this.lessonService.setCurrentSection(
        sectionId
    )

    }
    answerQuiz( sectionId,quizId,optionIndex,answer
    ) {
        this.lessonService.answerQuiz( sectionId, quizId, optionIndex, answer )
        this.engine.emit('lessonStateChanged', {
            currentSectionId:
                this.lessonService.getLesson().currentSectionId
        })
    }
    async answerSurvey(
        surveyId,
        optionIndex
    ) {
        const result = await this.lessonService.answerSurvey( surveyId, optionIndex )
        this.engine.emit('lessonStateChanged', {
            currentSectionId:
                this.lessonService.getLesson().currentSectionId
        })

        return result
    }

    getState() {
        return this.lessonService.getLesson()
    }

isVisible(node, viewport) {

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
        this.lessonService.advanceSection()
        if(moved) {
            this.engine.emit('lessonStateChanged', {
                currentSectionId:
                    this.lessonService.getLesson().currentSectionId
            })
        }
    return moved
}
startPhase() {
    this.lessonService.startPhase()
}
   finishLesson() {
    this.lessonService.finishLesson()
    this.engine.emit('lessonStateChanged', {
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })
}
moveOrderingItem(sectionId, itemIndex, direction) {
    const result = this.lessonService.moveOrderingItem(
        sectionId,
        itemIndex,
        direction
    )

    this.engine.emit('lessonStateChanged', {
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })

    return result
}

checkOrdering(sectionId) {
    const result =
        this.lessonService.checkOrdering(sectionId)

    this.engine.emit('lessonStateChanged', {
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })

    return result
}
}
