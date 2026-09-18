import { ActivityState } from "./activityState.js";

export class DragDropState extends ActivityState{
    constructor(section) {
        super(section)
        this.wordbank = [...(section.wordbank || [])]
        this.answers = {}
        this.checked = false
        this.correct = false
        this.feedback = ''
        this.correctAnswers ={ ...(section.answers || {}) }
        this.correctFeedback =
            section.feedback ||
            "Great job! You've completed the drag and drop activity."
            this.shuffleWordbank()
    }  
    shuffleWordbank() {
        for (let i = this.wordbank.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.wordbank[i], this.wordbank[j]] = [
                this.wordbank[j],
                this.wordbank[i]
            ]
        }
    }
    placeWord(gapIndex,word) {
        this.answers[gapIndex] = word
        this.checked = false
        this.correct = false
        this.feedback = ''
        return true
    }
    removeWord(gapIndex) {
        delete this.answers[gapIndex]
        this.checked = false
        this.correct = false
        this.feedback = ''
        return true
    }
    checkAnswers() {
       const correctKeys = Object.keys(this.correctAnswers)
       const answerKeys = Object.keys(this.answers)
       this.correct = correctKeys.length === answerKeys.length && correctKeys.every(key => this.answers[key] === this.correctAnswers[key])
       this.checked = true
       this.feedback = this.correct ? this.correctFeedback : "Some answers are incorrect. Please try again."
       return this.correct
    }
    getAnswers() {
        return this.answers
    }
    getWordbank() {
        return this.wordbank
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
        this.answers = {}
        this.checked = false
        this.correct = false
        this.feedback = ''
        this.wordbank = [...(this.section.wordbank || [])]
        this.shuffleWordbank()
    }
}