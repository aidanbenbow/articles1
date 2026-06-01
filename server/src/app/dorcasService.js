export class DorcasService {
    constructor(repRepo) {
        this.repRepo = repRepo;
       
    }
    fetchAllReports() {
        return this.repRepo.fetchAllReports();
    }
    updateReport(reportId, updates) {
        return this.repRepo.updateReport(reportId, updates);
    }
}