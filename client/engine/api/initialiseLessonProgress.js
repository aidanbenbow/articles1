import { fetchAuthSession } from "aws-amplify/auth";

async function getAuthHeaders(includeJson = false) {
    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken?.toString();

    if (!accessToken) {
        throw new Error('You must be signed in to access lesson progress.');
    }

    return {
        ...(includeJson ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${accessToken}`
    };
}

async function fetchLessonProgress() {
     const headers = await getAuthHeaders();
   const response = await fetch('/api/lesson-progress', {
    method: 'GET',
    headers
});

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



export async function fetchWeeklyLeaderboard() {
    const headers = await getAuthHeaders();

    const response = await fetch('/api/weekly-leaderboard', {
        method: 'GET',
        headers
    });

    if (!response.ok) {
        throw new Error(
            `Failed to load weekly leaderboard: ${response.status}`
        );
    }

    return response.json();
}



export async function initializeLessonProgress(
    progressStore,
    userId
) {
     if (!userId) {
        throw new Error('A userId is required for the local progress store.');
    }

    const records = await fetchLessonProgress();

    // userId is used only as the local store key.
    // It is not sent to the backend.
    progressStore.replaceForUser(userId, records);

    console.log(
        `Loaded ${records.length} lesson progress records for ${userId}`
    );

    return progressStore;
}

// export async function saveLessonProgress(progress) {
//     if (!progress.lessonId) {
//         throw new Error('lessonId is required');
//     }

//     const headers = await getAuthHeaders(true);

//     // Remove the old browser-supplied identity field.
//     const { userId, ...progressData } = progress;

//     const response = await fetch('/api/lesson-progress', {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify(progressData)
//     });

//     if (!response.ok) {
//         const errorDetails = await response.text();

//         throw new Error(
//             `Failed to save lesson progress: ${response.status} ${errorDetails}`
//         );
//     }

//     return response.json();
// }