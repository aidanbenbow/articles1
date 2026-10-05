
export function getWelcomeTitle({ appState }) {
    const user = appState.user?.name || 'Guest'

    return `Welcome ${user}`
}

export function getProgressText({
    appState,
    articleNodes = []
}) {
    const score = appState.user?.score || 0
    const lessonsCompleted =
        appState.user?.lessonsCompleted || 0

    const lessonsAvailable =
        articleNodes.filter(
            node => node.props?.articleData?.articleId
        ).length || 0

    return [
        'Your learning progress:',
        '',
        `Lessons completed: ${lessonsCompleted}`,
        `Lessons available: ${lessonsAvailable}`,
        `Points earned: ${score}`
    ].join('\n')
}

export function getPromptText() {
    return 'What would you like to learn next?'
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

