export class ActivityState {
    constructor(section) {
        this.id = section.id
        this.type = section.type
        this.completed = false
        this.section = section
    }

    complete() {
        this.completed = true
    }

    isComplete() {
        return false
    }
}