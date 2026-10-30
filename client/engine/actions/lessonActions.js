
export class LessonActions {
    constructor(engine) {
        this.engine = engine

        this.handlers = {
            finishLessonSection: () => this.finishLessonSection(),
            advanceLessonSection: () => this.advanceLessonSection(),
            startLessonPhase: () => this.startLessonPhase(),
        }
    }

    finishLessonSection() {
        this.engine.context.finishLesson()
        this.emitLayoutChanged()
    }

    advanceLessonSection() {
        this.engine.context.advanceLessonSection()
    }

    startLessonPhase() {
        this.engine.context.startLessonPhase()

        this.engine.emit(
            'lessonStateChanged',
            this.engine.context.getLesson()
        )
    }

    emitLayoutChanged() {
        this.engine.emit('layoutChanged', {
            layout: this.engine.context.getLayout().layoutNodes
        })
    }
}
