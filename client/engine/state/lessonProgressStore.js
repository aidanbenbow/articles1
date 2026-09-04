import { LessonProgress } from './lessonProgress.js'

export class LessonProgressStore {

    constructor(storage=localStorage) {
        this.storage = storage
        this.progress = new Map()
        this.load()
    }

    load(){
        const raw = this.storage.getItem('lessonProgress')
        if (!raw) {
            return
        }

        try {
            const records = JSON.parse(raw)
            for (const record of records) {
                const lessonProgress = new LessonProgress(record)
                this.progress.set(
                    lessonProgress.lessonId,
                    lessonProgress
                )
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

            this.progress.set(
                lessonProgress.lessonId,
                lessonProgress
            )
        }
    }

    set(record) {

        const lessonProgress =
            record instanceof LessonProgress
                ? record
                : new LessonProgress(record)

        this.progress.set(
            lessonProgress.lessonId,
            lessonProgress
        )
        this.save()
        return lessonProgress
    }
     update(lessonId, changes = {}) {

        const existing =
            this.progress.get(lessonId)

        return this.set({
            ...(existing ?? {}),
            ...changes,
            lessonId
        })
    }
    get(lessonId) {
        return this.progress.get(lessonId) ?? null
    }
    clear() {
        this.progress.clear()
    }
}