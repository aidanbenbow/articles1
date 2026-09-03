import { createActivityState } from "./stateFactory.js"

export class LessonState {

    constructor(lesson={}) {

        this.articleId = lesson.id
        this.title = lesson.title
        this.sections = lesson.sections || []
        
        this.description = lesson.description || ''
        this.currentSectionIndex = 0
     
        this.quizScore = 0
         this.quizTotal = lesson.quizTotal

         this.activities = Object.fromEntries(
            this.sections.map(section => [
                section.id,
                createActivityState(section)
            ])
        )
           // this.surveyTotal = lesson.surveyTotal
            this.lessonTotal = lesson.lessonTotal

        // this.surveyResponses = {}
        // this.surveyResults = {}

        this.phase = 'not-started'
        this.currentSectionId =
            this.sections[0]?.id ?? null
        this.completedSections = []
         this.startedAt = new Date().toISOString()
        this.completed = false
    }
    start(){
        this.phase = 'intro'
    }
    startPhase() {
        this.phase = 'active'
    }
    end() {
        this.phase = 'completed'
    }
   setCurrentSection(sectionId) {
    this.currentSectionId = sectionId

        this.currentSectionIndex =
            this.sections.findIndex(
                section => section.id === sectionId
            )
}
     completeSection(sectionId) {
        if (
            !this.completedSections.includes(sectionId)
        ) {
            this.completedSections.push(sectionId)
        }
    }
 isSectionComplete(sectionId) {
        return this.completedSections.includes(sectionId)
    }

    getCompletedCount() {
    return this.completedSections.length
}

 getSectionState(sectionId) {
    if(this.isSectionComplete(sectionId)) {
        return 'completed'
    }
    if(this.currentSectionId === sectionId) {
        return 'current'
    }
    return 'locked'
}
getCurrentSection() {

    return this.sections.find(
        s => s.id === this.currentSectionId
    ) ?? null
}
    
    getProgress() {
        if (!this.sections.length) {
            return 0
        }

        return Math.round(
            ( this.getCompletedCount() /  this.sections.length) * 100
        )
    }
   advanceSection() {
 console.log(
        'BEFORE ADVANCE:',
        this.currentSectionId,
        this.currentSectionIndex
    )
    const current =
        this.getCurrentSection()

    if (!current) {
        return false
    }

    if (!this.canUnlockNextSection()) {
        return false
    }

    this.completeSection(current.id)

    const next =this.getNextSection()

    if (!next) {
        this.completed = true
        this.currentSectionId = null
        return true
    }

    this.currentSectionIndex++

    this.currentSectionId = next.id

    return true
}
canUnlockNextSection() {
    const activity =
        this.activities[this.currentSectionId]
console.log( 'Checking if can unlock next section:', this.currentSectionId, activity?.isComplete())
    return activity?.isComplete() ?? false
}
     getNextSection() {
        const nextIndex =
            this.currentSectionIndex + 1

        return (
            this.sections[nextIndex] || null
        )

    }
    hasNextSection() {
    return this.getNextSection() !== null
}

isLastSection() {
    return !this.hasNextSection()
}
restoreProgress(progress) {
    if (!progress) {
        return
    }

    this.completedSections = [
        ...(progress.completedActivityIds ?? [])
    ]

    this.quizAnswers = {
        ...(progress.quizAnswers ?? {})
    }

    this.quizScore =  progress.quizScore ?? 0

    this.surveyResponses = {
        ...(progress.surveyResponses ?? {})
    }
    this.orderingAnswers = progress.orderingAnswers || {}

    this.currentSectionId =  progress.currentActivityId ?? this.sections[0]?.id ?? null

    this.currentSectionIndex =
        this.sections.findIndex(
            section => section.id === this.currentSectionId
        )

    if (this.currentSectionIndex < 0) {
        this.currentSectionIndex = 0
        this.currentSectionId =
            this.sections[0]?.id ?? null
    }

    this.completed =  progress.status === 'completed'

    if (this.completed) {
        this.phase = 'completed'
    } else if (progress.status === 'in_progress') {
        this.phase = 'active'
    }
}
answerQuiz(sectionId, quizId, optionIndex, answer) {
    const quiz = this.activities[sectionId]

    if (!quiz) {console.warn(
            `No quiz found for sectionId: ${sectionId}`)
        return}

           const result = quiz.answerQuestion(quizId, optionIndex, answer)

           return {
            currentSection: this.currentSectionId,
            correct: result.correct,
            score: quiz.getScore(),
            progress: this.getProgress(),
            results: result
        }
  
}

}