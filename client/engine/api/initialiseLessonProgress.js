async function fetchLessonProgress() {
    const response =
        await fetch('/api/lesson-progress')

    if (!response.ok) {
        throw new Error(
            `Failed to load lesson progress: ${response.status}`
        )
    }

    return response.json()
}

export async function initializeLessonProgress(
    progressStore
) {
    try {
        const records =
            await fetchLessonProgress()

        progressStore.setAll(records)

        return progressStore
    } catch (error) {
        console.error(
            'Error fetching lesson progress:',
            error
        )

        return progressStore
    }
}