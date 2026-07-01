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
}