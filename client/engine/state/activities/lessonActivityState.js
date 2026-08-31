import { ActivityState } from './activityState.js'

export class LessonActivityState extends ActivityState {
    constructor(section) {
        super(section)
        this.completed = true
    }

    markComplete() {
        this.completed = true
    }

    isComplete() {
        return this.completed
    }
}