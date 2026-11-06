import { LessonProgress } from './lessonProgress.js'

export class LessonProgressStore {

    constructor(storage=localStorage) {
        this.storage = storage
        this.progress = new Map()
        this.load()
    }

    load(){
        const raw = this.storage.getItem('lessonProgress')
        if (!raw)    return
        try {
            const records = JSON.parse(raw)
            for (const record of records) {
                const lessonProgress = new LessonProgress(record)
                const key = this.getKey(
    lessonProgress.userId,
    lessonProgress.lessonId
)

this.progress.set(key, lessonProgress)
            }
          
        } catch (error) {
            console.error('Failed to load lesson progress:', error)
        }
        
    }
    save(){
        const records = [...this.progress.values()]
        this.storage.setItem('lessonProgress', JSON.stringify(records))
    }

    setAll(records = []) {

        this.progress.clear()

        for (const record of records) {

            const lessonProgress =
                record instanceof LessonProgress
                    ? record
                    : new LessonProgress(record)

            const key = this.getKey( lessonProgress.userId,lessonProgress.lessonId)

            this.progress.set(key, lessonProgress)
            this.save()
        }
    }
    set(record) {
        const lessonProgress =
            record instanceof LessonProgress
                ? record
                : new LessonProgress(record)
const key = this.getKey(
        lessonProgress.userId,
        lessonProgress.lessonId)

        this.progress.set( key, lessonProgress)
        this.save()
        return lessonProgress
    }
     update(userId, lessonId, changes = {}) {
        const key = this.getKey(userId, lessonId)
        const existing = this.progress.get(key)

        return this.set({
            ...(existing ?? {}),
            ...changes,
            lessonId,
            userId
        })
    }
    get(userId, lessonId) {
        const key = this.getKey(userId, lessonId)
        return this.progress.get(key) ?? null
    }
    getKey(userId, lessonId) {
    return `${userId}::${lessonId}`
}
    clear() {
        this.progress.clear()
        this.save()
    }
    
replaceForUser(userId, records = []) {
    // Remove the old cached progress for this user only
    for (const [key, record] of this.progress.entries()) {
        if (record.userId === userId) {
            this.progress.delete(key);
        }
    }

    // Insert the records retrieved from DynamoDB
    for (const record of records) {
        const lessonProgress = new LessonProgress({
            ...record,
            userId
        });

        const key = this.getKey(
            userId,
            lessonProgress.lessonId
        );

        this.progress.set(key, lessonProgress);
    }

    // Save the updated local cache once
    this.save();
}

}