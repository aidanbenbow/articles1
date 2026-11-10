async function fetchLessonProgress(userId) {
    if (!userId) {
        throw new Error('A userId is required');
    }
   const response = await fetch(
        `/api/lesson-progress?userId=${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load lesson progress: ${response.status}`
        )
    }

    return response.json()
}

export async function fetchLeaderboard() {
    const response = await fetch('/api/leaderboard');

    if (!response.ok) {
        throw new Error(
            `Failed to load leaderboard: ${response.status}`
        );
    }

    return response.json();
}

export async function initializeLessonProgress(
    progressStore,
    userId
) {
    try {
        const records =
            await fetchLessonProgress(userId)

        progressStore.replaceForUser(userId, records)
console.log(
            `Loaded ${records.length} lesson progress records for ${userId}`
        );
        return progressStore
    } catch (error) {
        console.error(
            'Error fetching lesson progress:',
            error
        )

        return progressStore
    }
}