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
        this.correctCount = 0
        
            this.pointsPerWord = 2
            this.scoreValue= Object.keys(this.correctAnswers).length * this.pointsPerWord
            this.scoreAwarded = false
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
       const totalCount = Object.keys(this.correctAnswers).length
        const answerCount = Object.keys(this.answers).length
      this.correctCount = Object.keys(this.correctAnswers)
    .filter(key => this.answers[key] === this.correctAnswers[key])
    .length

    const complete = answerCount === totalCount
this.correct = complete && this.correctCount === totalCount
       this.checked = true
       this.feedback =  `You have ${this.correctCount} correct answers!`
      const scoreAwarded = complete && !this.scoreAwarded 
      if (scoreAwarded) { this.scoreAwarded = true } 
       return { correct: this.correct,
        complete,
        scoreAwarded: complete && !this.scoreAwarded,
        score: this.getScore(),
        correctCount: this.correctCount,
        answerCount,
        totalCount
    }
    
        
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
    getScore() {
        const correctKeys = Object.keys(this.correctAnswers)
        const correctCount = correctKeys.filter( key => this.answers[key] === this.correctAnswers[key] ).length
        return correctCount * this.pointsPerWord
    }
    isCorrect() {
        return this.correct
    }
    isComplete() {
        return Object.keys(this.answers).length ===
           Object.keys(this.correctAnswers).length
    }
    reset() {
        this.answers = {}
        this.checked = false
        this.correct = false
        this.feedback = ''
        this.correctCount = 0
        this.scoreAwarded = false
        this.wordbank = [...(this.section.wordbank || [])]
        this.shuffleWordbank()
    }
}