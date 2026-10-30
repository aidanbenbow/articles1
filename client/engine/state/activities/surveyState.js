import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\surveyState.js

export class SurveyState extends ActivityState {
    constructor(section) {
        super(section)
        this.response = null
        this.results = null
        this.scoreValue = 5
        this.scoreAwarded = false
        this.feedback = section.feedback || {}
    }

    answerQuestion(selectedOptionIndex) {
        if (this.response !== null) {
            return {
                alreadyAnswered: true,
                response:this.response,
                scoreAwarded: false,
                score: this.getScore()
            }
        }

        this.response = {
            selected: selectedOptionIndex,
            feedback: this.feedback
        }

        this.scoreAwarded = true

        return {
            alreadyAnswered: false,
            response: this.response,
            scoreAwarded: this.scoreAwarded,
            score: this.getScore()
        }
    }
    setResults(results) {
        this.results = results
    }

    getResults() {
        return this.results
    }

    getFeedback() {
    if (!this.results) {
        return this.feedback
    }
const responses = this.results.responses || []
const counts = Object.values(responses)
if (!counts.length) {
        return this.feedback?.default ?? ''
    }
const max= Math.max(...counts)
const majorityOptions = Object.keys(responses)
        .filter(index => responses[index] === max)

    if (majorityOptions.length > 1) {
        return this.feedback.default || ''
    }

    const majorityOption = majorityOptions[0]

    return this.feedback[`majority-${majorityOption}`]
        ?? this.feedback.default
        ?? ''

}

    isComplete() {
        return this.response !== null
    }

    getScore() {
        return this.scoreAwarded ? this.scoreValue : 0
    }

    getResponse() {
        return this.response
    }

    resetResponse() {
        this.response = null
        this.results = null
        this.scoreAwarded = false
    }
}