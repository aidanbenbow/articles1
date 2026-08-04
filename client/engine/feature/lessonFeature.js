import { LessonService } from "../services/lessonService.js"


export class LessonFeature {

    constructor(engine) {
        this.engine = engine
        this.lessonService = new LessonService()
    }

    contextExports() {
        return {
            startLesson:
                this.lessonService.startLesson.bind(this.lessonService),

            getLesson:
                this.lessonService.getLesson.bind(this.lessonService),
            answerQuiz:
                this.lessonService.answerQuiz.bind(this.lessonService)
        }
    }

}