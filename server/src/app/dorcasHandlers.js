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
    app.post('/api/reports', async (req, res) => {
        const reportData = {
            name: req.body.name,
            message: req.body.message,
            report: req.body.report,
            messageYear: 26,
            id: req.body.id
        }
        try {
            await dorcasService.updateReport(reportData.id, reportData);
        } catch (error) {
            console.error('Error updating report:', error);
            return res.status(500).json({ error: 'Failed to update report' });
        }
    res.json({ success: true })
})
}