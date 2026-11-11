export const ANALYTICS_LAYOUT = {
    screen: 'analytics',

    nodes: (context) => {
        const analytics =
            context.engine.context.getLessonAnalyticsService()

        const completionRate = analytics.getCompletionRate()
const difficulty = analytics.getDifficultyDistribution()
const completedLessons = analytics.getAllProgress().filter(
    record => record.status === 'completed'
).length
const leaderboard =
    context.engine.context.getLeaderboard?.() ?? { players: [] }
        return [
            {
                id: 'analytics-title',
                type: 'text',
                typography: 'title',
                color: 'heading',
                value: 'Learning Analytics'
            },
            {
                id: 'completion-rate',
                type: 'text',
                typography: 'body',
                color: 'text',
                value: `Completion Rate: ${completionRate}%`
            },
            {
    id: 'average-active-time',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Average Active Time: ${analytics.getAverageActiveTime()} seconds`
},
{
    id: 'average-estimated-duration',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Average Estimated Lesson Duration: ${analytics.getAverageEstimatedDuration()} minutes`
},
{
    id: 'difficulty-easy',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Easy: ${difficulty.easy || 0}`
},
{
    id: 'difficulty-medium',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Medium: ${difficulty.medium || 0}`
},
{
    id: 'difficulty-hard',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Hard: ${difficulty.hard || 0}`
},
{
    id: 'completed-lessons',
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `Lessons Completed: ${completedLessons}`
},
{
    id: 'back-to-category',
    type: 'button',
    text: 'Back to category',
    action: 'returnToCategory',
    kind: 'lessonButton'
},
{
    id: 'leaderboard-title',
    type: 'text',
    typography: 'title',
    color: 'heading',
    value: 'Global Leaderboard'
},
...leaderboard.players.map(player => ({
    id: `leaderboard-${player.userId}`,
    type: 'text',
    typography: 'body',
    color: 'text',
    value: `${player.rank}. ${player.userId} — Completed: ${player.completedLessons}, Active Time: ${player.totalActiveTime}s, Score: ${player.totalScore}`
}))
        ]
    }
}