export function registerArticlesHandlers(app, articlesService) {
    app.get('/api/articles', async (req, res) => {
        try {
            const articles = await articlesService.fetchAllArticles();
            res.json(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    });
    app.post('/api/articles/:articleId/complete', async (req, res) => {
        const { articleId } = req.params;
        console.log(`Received request to mark article ${articleId} as complete`);
        try {
            const success = await articlesService.markArticleAsComplete(articleId);
            if (success) {
                res.json({ success: true });
            } else {
                res.status(500).json({ error: 'Failed to mark article as complete' });
            }
        } catch (error) {
            console.error('Error marking article as complete:', error);
            res.status(500).json({ error: 'Failed to mark article as complete' });
        }
    });
    app.post('/api/articles/:articleId/views', async (req, res) => {
        const { articleId } = req.params;
        console.log(`Received request to increment views for article ${articleId}`);
        try {
            const updatedArticle = await articlesService.incrementViews(articleId);
            res.json(updatedArticle);
        } catch (error) {
            console.error('Error incrementing views for article:', error);
            res.status(500).json({ error: 'Failed to increment views for article' });
        }
    });

    app.get('/api/lesson-progress', async (req, res) => {
        try {
            const progressRecords = [
//              {
//         "lessonId": "tofu",
//         "status": "in_progress",
//         "progressPercent": 35,
//         "currentActivityId": 
// "coagulation",
//         "completedActivityIds": [
// "tried-tofu",
// "section-0",
// "tofu-intro",
// "section-1",
// "soymilk-process",
// "section-2"],
//     },   
   
    {
        "lessonId": "life-lessons-from-var",
        "status": "in_progress",
        "progressPercent": 20,
        "currentActivityId": null,
        "completedActivityIds": []
    }
]
            res.json(progressRecords);
        } catch (error) {
            console.error('Error fetching lesson progress:', error);
            res.status(500).json({ error: 'Failed to fetch lesson progress' });
        }
    });
}