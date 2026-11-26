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

// Get the analytics service
        const analyticsService =
            this.engine.context.getLessonAnalyticsService?.()
console.log("Analytics service:", analyticsService)
        // Read cached cohort analytics
        const analytics = analyticsService
            ?.getCachedAnalytics(appState.activeLessonId) ?? null
console.log(
    "Cached analytics for lesson",
    appState.activeLessonId,
    ":",
    analytics
)
if (
    analyticsService &&
    !analytics &&
    appState.activeLessonId
) {
    console.log("Fetching analytics for:", appState.activeLessonId)

    analyticsService
        .loadLessonAnalytics(appState.activeLessonId)
        .then(result => {
            console.log("Analytics fetch result:", result)

            this.engine.context.appStateChanged?.()
        })
}
        this.compile(LESSON_LAYOUT, {
            ...context,
            articleNode,
            lesson,
            section,
            activity,
            analytics
        })
    }
}