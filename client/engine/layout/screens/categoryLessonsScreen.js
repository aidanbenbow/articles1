import { CATEGORY_LESSONS_LAYOUT } from "../config/categoryLessonsConfig.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"


export class CategoryLessonsLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'category')
    }

    build(context) {
        const { articleNodes, appState } = context

        const selectedCategory = appState.selectedCategory
       
const userId = appState?.user?.userId
        const progressStore =
    this.engine.context.getLessonProgressStore?.()

const completedLessonIds = new Set(
    progressStore
        ?.getAllForUser(userId)
        .filter(record => record.completed)
        .map(record => record.lessonId) ?? []
)
    
        const availableLessons = articleNodes
            .map(node => node.props?.articleData)
            .filter(article =>
                article?.articleId &&
                article.category === selectedCategory 
            ).map(article => ({
                ...article,
                completed: completedLessonIds.has(article.articleId)
            }))

        this.compile(CATEGORY_LESSONS_LAYOUT, {
            ...context,
            selectedCategory,
            availableLessons,
            appState
        })
    
    }
}