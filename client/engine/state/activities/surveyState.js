import { ActivityState } from './activityState.js'

// filepath: d:\articles1\client\engine\state\activities\surveyState.js

export class SurveyState extends ActivityState {
    constructor(section) {
        super(section)
        this.response = null
        this.results = null
        this.feedback = section.feedback || ''
    }

    answerQuestion(selectedOptionIndex) {
        if (this.response !== null) {
            return {
                alreadyAnswered: true,
                response:this.response
            }
        }

        this.response = {
            selected: selectedOptionIndex,
            feedback: this.feedback
        }

        return {
            alreadyAnswered: false,
            response: this.response
        }
    }
    setResults(results) {
        this.results = results
    }

    getResults() {
        return this.results
    }

    isComplete() {
        return this.response !== null
    }

    getResponse() {
        return this.response
    }

    resetResponse() {
        this.response = null
        this.results = null
    }
}