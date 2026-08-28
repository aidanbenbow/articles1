import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\orderingState.js

export class OrderingState extends ActivityState {
    constructor(section) {
        super(section)
        this.items = [...(section.items || [])]
        this.checked = false
        this.correct = false
        this.feedback = section.feedback || ''
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
            ? 'Great job! You\'ve reconstructed the process.'
            : 'Not quite. Try rearranging the steps.'

        return this.correct
    }

    getItems() {
        return this.items
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
    }
}