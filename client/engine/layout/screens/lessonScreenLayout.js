import { LESSON_LAYOUT } from "../config/lessonConfig.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class LessonLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'lesson')
    }

    build(context) {
        const { articleNodes, appState } = context

        const articleNode = articleNodes.find(
            node => node.props?.articleData?.articleId === appState.activeLessonId
        )

        if (!articleNode) return

        const lesson = this.engine.context.getLesson()
        if (!lesson) return

        const section = lesson.getCurrentSection()

        const activity = section
            ? lesson.activities[section.id]
            : null

        this.compile(LESSON_LAYOUT, {
            ...context,
            articleNode,
            lesson,
            section,
            activity
        })
    }
}