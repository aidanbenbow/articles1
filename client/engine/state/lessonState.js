import { createActivityState } from "./stateFactory.js"

export class LessonState {

    constructor(lesson={}) {

        this.articleId = lesson.id
        this.title = lesson.title
        this.sections = lesson.sections || []
        
        this.description = lesson.description || ''
        this.currentSectionIndex = 0
       // this.quizAnswers = {}
        this.quizScore = 0
         this.quizTotal = lesson.quizTotal


         this.activities = Object.fromEntries(
            this.sections.map(section => [
                section.id,
                createActivityState(section)
            ])
        )
            this.surveyTotal = lesson.surveyTotal
            this.lessonTotal = lesson.lessonTotal

        this.surveyResponses = {}
        this.surveyResults = {}

        this.orderingAnswers = {}

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
            (
                this.getCompletedCount() /
                this.sections.length
            ) * 100
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


    const next =
        this.getNextSection()

    if (!next) {

        this.completed = true
        this.currentSectionId = null
     
        return true
    }


    this.currentSectionIndex++

    this.currentSectionId =
        next.id

    return true
}
canUnlockNextSection() {
    const activity =
        this.activities[this.currentSectionId]

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

    this.quizScore =
        progress.quizScore ?? 0

    this.surveyResponses = {
        ...(progress.surveyResponses ?? {})
    }
    this.orderingAnswers =
    progress.orderingAnswers || {}

    this.currentSectionId =
        progress.currentActivityId ?? this.sections[0]?.id ?? null

    this.currentSectionIndex =
        this.sections.findIndex(
            section => section.id === this.currentSectionId
        )

    if (this.currentSectionIndex < 0) {
        this.currentSectionIndex = 0
        this.currentSectionId =
            this.sections[0]?.id ?? null
    }

    this.completed =
        progress.status === 'completed'

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
answerSurvey(surveyId, optionIndex) {
    if (surveyId in this.surveyResponses) {
        return {
            alreadyAnswered: true,
            response: this.surveyResponses[surveyId]
        }
    }

    
const section =
        this.sections.find(
            section => section.id === surveyId
        )
        const response = {
            selected: optionIndex,
            feedback: section?.feedback ?? ''
        }
    this.surveyResponses[surveyId] = response

   // this.completeSection(surveyId)

    return {
        alreadyAnswered: false,
        ...response
    }
}
setSurveyResults(surveyId, results) {
    this.surveyResults[surveyId] = results
}
moveOrderingItem(
    sectionId,
    itemIndex,
    direction
) {
    const section =
        this.sections.find(
            section => section.id === sectionId
        )

    if (!section) {
        return {
            success: false,
            reason: 'section-not-found'
        }
    }

    if (!this.orderingAnswers[sectionId]) {
        this.orderingAnswers[sectionId] = {
            items: [...section.items],
            checked: false,
            correct: false,
            feedback: ''
        }
    }

    const answer =
        this.orderingAnswers[sectionId]

    const items = answer.items

    const targetIndex =
        direction === 'up'
            ? itemIndex - 1
            : itemIndex + 1

    if (
        targetIndex < 0 ||
        targetIndex >= items.length
    ) {
        return {
            success: false,
            reason: 'edge'
        }
    }

    ;[
        items[itemIndex],
        items[targetIndex]
    ] = [
        items[targetIndex],
        items[itemIndex]
    ]

    answer.checked = false
    answer.correct = false
    answer.feedback = ''

    return {
        success: true
    }
}checkOrdering(sectionId) {

    const section =
        this.sections.find(
            section => section.id === sectionId
        )

    if (!section) {
        return {
            correct: false,
            reason: 'section-not-found'
        }
    }

    const answer =
        this.orderingAnswers?.[sectionId]

    if (!answer) {
        return {
            correct: false,
            reason: 'not-started'
        }
    }

    const correct =
        section.items.length ===
            answer.items.length &&
        section.items.every(
            (item, index) =>
                item === answer.items[index]
        )

    answer.checked = true
    answer.correct = correct

    answer.feedback =
        correct
            ? section.feedback ||
              "Great job! You've reconstructed the process."
            : 'Not quite. Try rearranging the steps.'

    if (correct) {
        // potentially complete the activity here
    }

    return {
        correct,
        feedback: answer.feedback
    }
}
}