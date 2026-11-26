import { requireAuth } from "../http/authMiddleware.js";


const allowedProgressFields = [
    'displayName',
    'status',
    'progressPercent',
    'currentActivityId',
    'completedActivityIds',
    'quizAnswers',
    'quizScore',
    'dragDropAnswers',
    'surveyResponses',
    'orderingAnswers',

    'totalScore',
    'maxPossibleScore',
    'scorePercentage',
    'scoringVersion',
    'completedAt',
    'startedAt',
    'activeTimeSeconds',
    'lastAccessedAt'
];


function validateProgress(progress) {
    if (!progress || typeof progress !== 'object' || Array.isArray(progress)) {
        return 'Progress must be an object';
    }

    if (
        typeof progress.lessonId !== 'string' ||
        !progress.lessonId.trim() ||
        progress.lessonId.length > 200
    ) {
        return 'A valid lessonId is required';
    }

    const validStatuses = [
        'not_started',
        'in_progress',
        'completed'
    ];

    if (
        progress.status !== undefined &&
        !validStatuses.includes(progress.status)
    ) {
        return 'Invalid progress status';
    }

    if (
        progress.progressPercent !== undefined &&
        (
            !Number.isFinite(progress.progressPercent) ||
            progress.progressPercent < 0 ||
            progress.progressPercent > 100
        )
    ) {
        return 'progressPercent must be between 0 and 100';
    }

    const numericFields = [
        'quizScore',
        'totalScore',
        'maxPossibleScore',
        'activeTimeSeconds'
    ];

    for (const field of numericFields) {
        if (
            progress[field] !== undefined &&
            (
                !Number.isFinite(progress[field]) ||
                progress[field] < 0
            )
        ) {
            return `${field} must be a non-negative number`;
        }
    }

    if (
        progress.scorePercentage !== undefined &&
        progress.scorePercentage !== null &&
        (
            !Number.isFinite(progress.scorePercentage) ||
            progress.scorePercentage < 0 ||
            progress.scorePercentage > 100
        )
    ) {
        return 'scorePercentage must be between 0 and 100';
    }

    if (
        progress.scoringVersion !== undefined &&
        (
            !Number.isInteger(progress.scoringVersion) ||
            progress.scoringVersion < 1
        )
    ) {
        return 'scoringVersion must be a positive integer';
    }

    if (
        progress.completedActivityIds !== undefined &&
        (
            !Array.isArray(progress.completedActivityIds) ||
            !progress.completedActivityIds.every(
                id => typeof id === 'string'
            )
        )
    ) {
        return 'completedActivityIds must be an array of strings';
    }

    if (
        progress.currentActivityId !== undefined &&
        progress.currentActivityId !== null &&
        typeof progress.currentActivityId !== 'string'
    ) {
        return 'currentActivityId must be a string or null';
    }

    const objectFields = [
        'quizAnswers',
        'surveyResponses',
        'orderingAnswers',
        'dragDropAnswers'
    ];

    for (const field of objectFields) {
        if (
            progress[field] !== undefined &&
            (
                progress[field] === null ||
                typeof progress[field] !== 'object' ||
                Array.isArray(progress[field])
            )
        ) {
            return `${field} must be an object`;
        }
    }

    const timestampFields = [
        'startedAt',
        'completedAt',
        'lastAccessedAt'
    ];

    for (const field of timestampFields) {
        if (
            progress[field] !== undefined &&
            progress[field] !== null &&
            (
                typeof progress[field] !== 'string' ||
                Number.isNaN(Date.parse(progress[field]))
            )
        ) {
            return `${field} must be a valid timestamp or null`;
        }
    }

    return null;
}


export function registerLessonProgressHandlers(
    app,
    lessonProgressService
) {
    app.get('/api/leaderboard', async (req, res) => {
    try {
        const snapshot = await lessonProgressService.getLeaderboard();

        res.json(snapshot || {
            players: [],
            updatedAt: null
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({
            error: 'Failed to fetch leaderboard'
        });
    }
});

    // Get current weekly leaderboard
    app.get(
        '/api/weekly-leaderboard',
        requireAuth,
        async (req, res) => {
            try {
                const snapshot =
                    await lessonProgressService.getWeeklyLeaderboard();

                res.json(snapshot || {
                    weekKey: null,
                    players: [],
                    updatedAt: null
                });

            } catch (error) {
                console.error(
                    'Error fetching weekly leaderboard:',
                    error
                );

                res.status(500).json({
                    error: 'Failed to fetch weekly leaderboard'
                });
            }
        }
    );

 // Get authenticated learner's progress
    app.get('/api/lesson-progress', requireAuth, async (req, res) => {
        try {
            const progressRecords =
                await lessonProgressService.getProgress(req.user.id);

            res.json(progressRecords);

        } catch (error) {
            console.error('Error fetching lesson progress:', error);

            res.status(500).json({
                error: 'Failed to fetch lesson progress'
            });
        }
    });

    // Save authenticated learner's progress
    app.put('/api/lesson-progress', requireAuth, async (req, res) => {
        try {
            const body = req.body ?? {};

            const validationError = validateProgress(body);

            if (validationError) {
                return res.status(400).json({
                    error: validationError
                });
            }

            // Only explicitly allowed fields are persisted.
            const progressData = Object.fromEntries(
                allowedProgressFields
                    .filter(field =>
                        Object.prototype.hasOwnProperty.call(body, field)
                    )
                    .map(field => [field, body[field]])
            );

            const progress = {
                ...progressData,
                lessonId: body.lessonId,
                userId: req.user.id
            };

            const savedProgress =
                await lessonProgressService.saveProgress(progress);

            res.json(savedProgress);
        } catch (error) {
            console.error('Error saving lesson progress:', error);

            res.status(500).json({
                error: 'Failed to save lesson progress'
            });
        }
    });

    // Delete authenticated learner's progress
    app.delete(
        '/api/lesson-progress/:lessonId',
        requireAuth,
        async (req, res) => {
            try {
                await lessonProgressService.deleteProgress(
                    req.user.id,
                    req.params.lessonId
                );

                res.json({ success: true });

            } catch (error) {
                console.error('Error deleting lesson progress:', error);

                res.status(500).json({
                    error: 'Failed to delete lesson progress'
                });
            }
        }
    );

    // Get aggregated analytics for a lesson
app.get(
    '/api/lesson-analytics/:lessonId',
    requireAuth,
    async (req, res) => {
        try {
            const analytics =
                await lessonProgressService.getLessonAnalytics(
                    req.params.lessonId
                );

            // Avoid exposing statistics from very small cohorts.
            if (analytics.completedCount < 10) {
                return res.json({
                    lessonId: analytics.lessonId,
                    available: false,
                    message: 'Insufficient learner data'
                });
            }

            res.json({
                ...analytics,
                available: true
            });
        } catch (error) {
            console.error(
                'Error fetching lesson analytics:',
                error
            );

            res.status(500).json({
                error: 'Failed to fetch lesson analytics'
            });
        }
    }
);
}
