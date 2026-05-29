export class DorcasService {
    constructor(repRepo) {
        this.repRepo = repRepo;
       
    }
    fetchAllReports() {
        return this.repRepo.fetchAllReports();
    }
}