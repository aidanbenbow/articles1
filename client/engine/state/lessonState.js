export class LessonState {

    constructor(articleId=null, sections=[]) {

        this.articleId = articleId
        this.sections = sections || []
        this.currentSectionIndex = 0
        this.quizAnswers = {}
        this.quizScore = 0
         this.quizTotal =
            sections.filter(
                s => s.type === 'quiz'
            ).length

        this.surveyResponses = {}
        this.surveyResults = {}

        this.currentSectionId =
            sections[0]?.id ?? null
        this.completedSections = []
         this.startedAt = new Date().toISOString()
        this.completed = false
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

        if (!this.canUnlockNextSection()) {
            return false
        }


        const next =
            this.getNextSection()


        if (!next) {

            this.completed = true
            return false

        }


        this.currentSectionIndex++

        this.currentSectionId =
            next.id


        return true

    }
canUnlockNextSection() {

        const current =
            this.getCurrentSection()


        if (!current) {
            return false
        }


        return this.isSectionComplete(
            current.id
        )

    }
     getNextSection() {

        const nextIndex =
            this.currentSectionIndex + 1


        return (
            this.sections[nextIndex] || null
        )

    }
}