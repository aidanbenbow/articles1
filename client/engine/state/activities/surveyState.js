import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\surveyState.js

export class SurveyState extends ActivityState {
    constructor(section) {
        super(section)
        this.response = null
        this.feedback = section.feedback || ''
    }

    answerQuestion(selectedOptionIndex) {
        if (this.response !== null) {
            return this.response
        }

        this.response = {
            selected: selectedOptionIndex,
            feedback: this.feedback
        }

        return this.response
    }

    isComplete() {
        return this.response !== null
    }

    getResponse() {
        return this.response
    }

    resetResponse() {
        this.response = null

    }
}