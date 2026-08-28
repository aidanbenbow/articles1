import { ActivityState } from "./activities/activityState.js"
import { LessonActivityState } from "./activities/lessonActivityState.js"
import { QuizState } from "./activities/quizState.js"
import { SurveyState } from "./activities/surveyState.js"

export function createActivityState(section) {
    switch (section.type) {
        case 'activity':
            return new ActivityState(section)
        case 'quiz':
            return new QuizState(section)
            case 'lesson':
            return new LessonActivityState(section)
            case 'survey':
            return new SurveyState(section)
        default:
            throw new Error(`Unknown section type: ${section.type}`)
    }
}