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
    this.engine.emit('lessonStateChanged', {
        phase: this.lessonService.getLesson().phase,
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    });

    }
    answerQuiz( sectionId,quizId,optionIndex,answer
    ) {
      const answerQuiz =  this.lessonService.answerQuiz( sectionId, quizId, optionIndex, answer )
        this.engine.emit('lessonStateChanged', {
            currentSectionId:
                this.lessonService.getLesson().currentSectionId
        })
        return answerQuiz
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

    advanceLesson() {    
    const result = this.lessonService.advanceSection()

    if (!result.success) return false

    if (result.completed) {this.engine.emit('lessonCompleted', result.results)
    }

    this.engine.context.resetScroll()

    this.engine.emit('lessonStateChanged', {
        phase: this.lessonService.getLesson().phase,
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })

    return result
}
startPhase() {
    this.lessonService.startPhase()
    this.engine.emit('lessonStateChanged', {
        phase: this.lessonService.getLesson().phase,
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    });
}
  async finishLesson() {
    const results = await this.lessonService.finishLesson()

    if (!results) return null

    this.engine.emit('lessonCompleted', results)

    this.engine.emit('lessonStateChanged', {
        phase: this.lessonService.getLesson().phase,
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })

    return results
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
checkDragDrop(sectionId) {
    const result =
        this.lessonService.checkDragDrop(sectionId)

    this.engine.emit('lessonStateChanged', {
        currentSectionId:
            this.lessonService.getLesson().currentSectionId
    })

    return result
}
completeSection(sectionId) {
    this.lessonService.completeSection(sectionId);

    this.engine.emit("lessonStateChanged", {
        phase: this.lessonService.lesson.phase,
        currentSectionId: this.lessonService.lesson.currentSectionId
    });
}

updateProgress() {
    return this.lessonService.syncProgress();
}

onViewPortChanged() {
    // Keep this if your canvas engine expects this callback.
    // Add viewport-specific behavior here if required.
}
}
