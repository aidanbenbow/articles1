import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\orderingState.js

export class OrderingState extends ActivityState {
    constructor(section) {
        super(section)
        this.items = [...(section.items || [])]
        this.shuffleItems()
        this.checked = false
        this.correct = false
         this.correctFeedback =
            section.feedback ||
            "Great job! You've reconstructed the process."

        this.feedback = ''
    }

    moveItem(itemIndex, direction) {
        const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1

        if (targetIndex < 0 || targetIndex >= this.items.length) {
            return false
        }

        ;[this.items[itemIndex], this.items[targetIndex]] = [
            this.items[targetIndex],
            this.items[itemIndex]
        ]

        this.checked = false
        this.correct = false
        this.feedback = ''

        return true
    }

    checkAnswer(correctItems) {
        this.correct =
            this.items.length === correctItems.length &&
            this.items.every((item, index) => item === correctItems[index])

        this.checked = true
        this.feedback = this.correct
            ? this.correctFeedback
            : 'Not quite. Try rearranging the steps.'

        return this.correct
    }

    shuffleItems() {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.items[i], this.items[j]] = [this.items[j], this.items[i]]
        }
    }

    getItems() {
        return this.items
    }
    getChecked() {
    return this.checked
}

getFeedback() {
    return this.feedback
}

    isCorrect() {
        return this.correct
    }

    isComplete() {
        return this.correct
    }

    reset() {
        this.items = [...this.section.items]
        this.checked = false
        this.correct = false
        this.feedback = ''
        this.shuffleItems()
    }
}