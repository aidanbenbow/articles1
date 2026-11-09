import { CATEGORY_LESSONS_LAYOUT } from "../config/categoryLessonsConfig.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"


export class CategoryLessonsLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'category')
    }

    build(context) {
        const { articleNodes, appState } = context

        const selectedCategory = appState.selectedCategory
       
        const completedLessons = appState.user?.completedLessons || []

        const availableLessons = articleNodes
            .map(node => node.props?.articleData)
            .filter(article =>
                article?.articleId &&
                article.category === selectedCategory &&
                !completedLessons.includes(article.articleId)
            )

        this.compile(CATEGORY_LESSONS_LAYOUT, {
            ...context,
            selectedCategory,
            availableLessons,
            appState
        })
    
    }
}