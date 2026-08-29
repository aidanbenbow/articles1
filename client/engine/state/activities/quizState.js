import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\quizState.js

export class QuizState extends ActivityState {
    constructor(section) {
        super(section)
        this.answers = {}
        this.score = 0
        this.feedback = section.feedback || ''
        
    }

    answerQuestion(questionId, selectedOptionIndex, correctAnswerIndex) {
        if (this.hasAnswered(questionId)) {
            return this.answers[questionId]
        }

        const isCorrect = selectedOptionIndex === correctAnswerIndex

        this.answers[questionId] = {
            selected: selectedOptionIndex,
            correct: correctAnswerIndex,
            isCorrect,
            feedback: this.feedback
        }

        if (isCorrect) {
            this.score++
        }

        return this.answers[questionId]
    }
isComplete() {
    return (
        this.getTotalQuestions() > 0 &&
        this.getAnsweredCount() ===
        this.getTotalQuestions()
    )
}
    getScore() {
        return this.score
    }

    getTotalQuestions() {
        return this.section?.questions?.length || 0
    }

    getAnsweredQuestions() {
        return Object.keys(this.answers).map(questionId => ({
            questionId,
            ...this.answers[questionId]
        }))
    }

    getAnsweredCount() {
        return Object.keys(this.answers).length
    }
    getAnswer(questionId) {
    return this.answers[questionId] ?? null
}

getAnswers() {
        return this.answers
    }

    hasAnswered(questionId) {
        return questionId in this.answers
    }

    resetAnswers() {
        this.answers = {}
        this.score = 0
        this.completed = false
    }
}