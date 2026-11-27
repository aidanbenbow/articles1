import { createActivityAnalyticsNodes } from "../../helpers/ativitiesAnalyticsNode";


export const CATEGORY_LESSONS_LAYOUT = {
    screen: 'category',

    nodes: (context) => {
        const { selectedCategory, availableLessons, appState } = context
  const completedLessons = availableLessons.filter(       article => article.completed );
        
        const nextLesson = availableLessons.find(
            article => !article.completed
        );

        const total = availableLessons.length;
        const completed = completedLessons.length;

        const percentage = total > 0
            ? Math.round((completed / total) * 100)
            : 0;
        const lessonNodes = availableLessons.flatMap(article => {
            const analytics = article.analytics
            const hasAnalytics = analytics?.available === true

           const summaryNodes = hasAnalytics ? [
        {
            id: `lesson-analytics-${article.articleId}`,
            type: 'text',
            typography: 'caption',
            color: 'muted',
            value:
                `Cohort completion: ${analytics.completionRate}% · ` +
                `Difficulty: ${analytics.empiricalDifficulty?.label ?? 'Unknown'} · ` +
                `Median duration: ${analytics.duration?.medianSeconds != null
                    ? `${analytics.duration.medianSeconds}s`
                    : 'Unknown'}`
        },
        ...createActivityAnalyticsNodes(article)
    ] : []

    return [
        {
            id: `lesson-${article.articleId}`,
            type: 'button',
            kind: 'lessonOption',
            action: 'openLesson',
            text: article.completed
                ? `✓ ${article.title} — Review`
                : article.title,
            articleId: article.articleId,
            completed: article.completed
        },
        ...summaryNodes
    ]
        })

        return [
            {
                id: 'category-title',
                type: 'text',
                typography: 'title',
                color: 'heading',
                value: selectedCategory
            },
            {
                id: 'category-intro',
                type: 'text',
                typography: 'body',
                color: 'text',
                value: 'Discover, learn and grow your knowledge.'
            },
            {
                id: 'progress-heading',
                type: 'text',
                typography: 'title',
                value: 'Your learning progress'
            },
            {
    id: 'progress-summary',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `${completed} of ${total} lessons completed · ${percentage}%`
},
{
    id: 'progress-encouragement',
    type: 'text',
    typography: 'paragraph',
    color: 'muted',
    value: percentage === 100
        ? 'Amazing work! You have mastered this category.'
        : percentage >= 50
            ? 'You are making excellent progress. Keep going!'
            : 'Every lesson brings you one step closer to your goal.'
},
            {
    id: 'category-progress',
    type: 'progress',
    value: percentage,
    height: 12
},
           ...(nextLesson ? [
                {
                    id: 'next-lesson-heading',
                    type: 'text',
                    typography: 'title',
                    value: 'Your next lesson'
                },
                {
    id: 'next-lesson-button',
    type: 'button',
    action: 'openLesson',
    text: `▶ Continue learning: ${nextLesson.title}`,
    articleId: nextLesson.articleId,
    height: 52
}
            ] : []),
             {
                id: 'lesson-list-heading',
                type: 'text',
                typography: 'title',
                value: 'Explore your lessons'
            },

...lessonNodes,
            ...(total > 0 && completed === total ? [
                {
                    id: 'category-complete',
                    type: 'text',
                    typography: 'body',
                    color: 'success',
                    value: '🎉 Congratulations! You completed this category!'
                }
            ] : []),
            {
                id: 'back-to-categories',
                type: 'button',
                action: 'openLessonBrowser',
                text: 'Back to categories'
            }
        ]
    }
}