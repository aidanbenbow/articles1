
export class LessonActions {
    constructor(engine) {
        this.engine = engine

        this.handlers = {
            finishLessonSection: () => this.finishLessonSection(),
            advanceLessonSection: () => this.advanceLessonSection(),
            startLessonPhase: () => this.startLessonPhase(),
            openLessonBrowser: () => this.openLessonBrowser(),
        }
    }

    finishLessonSection() {
      const result = this.engine.context.finishLesson()
      const lesson = this.engine.context.getLesson()
        this.engine.emit('lessonStateChanged', lesson)
        this.emitLayoutChanged()
        return result
    }

    advanceLessonSection() {
        const moved = this.engine.context.advanceLessonSection()

        if (!moved) {
            console.warn('Could not advance lesson. Current section may be incomplete.')
            return false
        }

        const lesson = this.engine.context.getLesson()

        if (lesson?.completed) {
            this.engine.context.finishLesson()
        }

        this.engine.emit('lessonStateChanged', lesson)

        this.emitLayoutChanged()

        return true
    }

    startLessonPhase() {
        this.engine.context.startLessonPhase()

        this.engine.emit(
            'lessonStateChanged',
            this.engine.context.getLesson()
        )
    }
    openLessonBrowser() {
        this.engine.context.app.openLessonBrowser()
    }

    emitLayoutChanged() {
        this.engine.emit('layoutChanged', {
            layout: this.engine.context.getLayout().layoutNodes
        })
    }
}
