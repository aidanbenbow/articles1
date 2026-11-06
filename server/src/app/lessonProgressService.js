
export class LessonProgressService {
    constructor(lessonProgressRepo) {
        this.lessonProgressRepo = lessonProgressRepo;
    }

    getProgress(userId) {
        return this.lessonProgressRepo.getProgress(userId);
    }

    saveProgress(progress) {
        return this.lessonProgressRepo.saveProgress(progress);
    }

    deleteProgress(userId, lessonId) {
        return this.lessonProgressRepo.deleteProgress(
            userId,
            lessonId
        );
    }
}
