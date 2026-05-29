export function registerDorcasHandlers(app, dorcasService) {
    app.get('/api/reports', async (req, res) => {
        try {
            const reports = await dorcasService.fetchAllReports();
            res.json(reports);
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({ error: 'Failed to fetch reports' });
        }
    });
}