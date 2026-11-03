import { ActivityActions } from "./activityActions.js"
import { InputActions } from "./inputActions.js"
import { LessonActions } from "./lessonActions.js"
import { NavigationActions } from "./navigationActions.js"
import { QuizActions } from "./quizActions.js"

export class ActionDispatcher {

    constructor(engine) {
        this.engine = engine

        this.handlers = {
             ...new LessonActions(engine).handlers,
             ...new QuizActions(engine).handlers,
             ...new ActivityActions(engine).handlers,
            ...new NavigationActions(engine).handlers,
            ...new InputActions(engine).handlers,
        }
    }

    async execute(node) {
        if (!node?.action) return

        const handler = this.handlers[node.action]

        if (!handler) {
            console.warn(`Unknown action: ${node.action}`)
            return
        }

        return handler(node)
    }
}