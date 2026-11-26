// lessonAnalyticsApi.js

import { fetchAuthSession } from "aws-amplify/auth";

async function getAuthHeaders() {
    const session = await fetchAuthSession();

    const accessToken =
        session.tokens?.accessToken?.toString();

    if (!accessToken) {
        throw new Error("Authentication required.");
    }

    return {
        Authorization: `Bearer ${accessToken}`
    };
}

export async function fetchLessonAnalytics(lessonId) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `/api/lesson-analytics/${encodeURIComponent(lessonId)}`,
        {
            method: "GET",
            headers
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load lesson analytics: ${response.status}`
        );
    }

    return response.json();
}