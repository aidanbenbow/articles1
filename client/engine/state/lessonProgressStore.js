import { LessonProgress } from './lessonProgress.js'

export class LessonProgressStore {

    constructor() {
        this.progress = new Map()
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