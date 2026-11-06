
export function registerLessonProgressHandlers(
    app,
    lessonProgressService
) {
    // Get lesson progress
    app.get('/api/lesson-progress', async (req, res) => {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({
                    error: 'userId is required'
                });
            }

            const progressRecords =
                await lessonProgressService.getProgress(userId);

            res.json(progressRecords);

        } catch (error) {
            console.error(
                'Error fetching lesson progress:',
                error
            );

            res.status(500).json({
                error: 'Failed to fetch lesson progress'
            });
        }
    });

    // Save lesson progress
    app.put('/api/lesson-progress', async (req, res) => {
        try {
            const progress = req.body;

            if (!progress.userId || !progress.lessonId) {
                return res.status(400).json({
                    error: 'userId and lessonId are required'
                });
            }

            const savedProgress =
                await lessonProgressService.saveProgress(progress);

            res.json(savedProgress);

        } catch (error) {
            console.error(
                'Error saving lesson progress:',
                error
            );

            res.status(500).json({
                error: 'Failed to save lesson progress'
            });
        }
    });

    // Delete lesson progress
    app.delete(
        '/api/lesson-progress/:userId/:lessonId',
        async (req, res) => {
            try {
                const { userId, lessonId } = req.params;

                await lessonProgressService.deleteProgress(
                    userId,
                    lessonId
                );

                res.json({ success: true });

            } catch (error) {
                console.error(
                    'Error deleting lesson progress:',
                    error
                );

                res.status(500).json({
                    error: 'Failed to delete lesson progress'
                });
            }
        }
    );
}
