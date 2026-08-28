import { ActivityState } from './activityState.js'

export class LessonActivityState extends ActivityState {
    constructor(section) {
        super(section)
        this.completed = false
    }

    markComplete() {
        this.completed = true
    }

    isComplete() {
        return this.completed
    }
}