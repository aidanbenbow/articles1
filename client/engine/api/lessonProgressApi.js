
export async function saveLessonProgress(progress, accessToken) {
    if (!progress.userId || !progress.lessonId) {
        throw new Error('userId and lessonId are required');
    }

    const response = await fetch('/api/lesson-progress', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(progress)
    });

    if (!response.ok) {
        const errorDetails = await response.text();

        throw new Error(
            `Failed to save lesson progress: ${response.status} ${errorDetails}`
        );
    }

    return true;
}

