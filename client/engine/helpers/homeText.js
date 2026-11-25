
export function getWelcomeTitle({ appState }) {
    const user = appState.user;

    const displayName =
        user?.displayName ||
        user?.name ||
        user?.givenName ||
        'Guest';

    return `Welcome, ${displayName}`;
}

export function getProgressText({
    appState,
    playerStats,
    articleNodes = []
}) {
    
    const score = playerStats?.totalXP || 0
    const lessonsCompleted =playerStats?.completedLessons || 0
const totalLessons = articleNodes.filter(node => node.props?.articleData?.articleId).length || 0
    const lessonsAvailable = totalLessons - lessonsCompleted
    return [
        'Your learning progress:',
        '',
        `Lessons completed: ${lessonsCompleted}`,
        `    Lessons available: ${lessonsAvailable}`,
        `    Points earned: ${score}`
    ].join('\n')
}

export function getPromptText() {
    return 'A series of educational lessons to help you learn and grow. Start your learning journey today!'
}

export function getInstructions() {
    return [
        'How it works:',
        '1. Read the lesson',
        '2. Think about what you learned',
        '3. Answer the questions',
        '4. Complete the lesson'
    ].join('\n')
}

