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

        this.completedSections = []
         this.startedAt = new Date().toISOString()
        this.completed = false
    }
     completeSection(sectionId) {

    if (!this.completedSections.includes(sectionId)) {
        this.completedSections.push(sectionId)
    }

}
    getProgress() {

        if (!this.sections.length) {
            return 0
        }

        return Math.round(
            (
                this.completedSections.length /
                this.sections.length
            ) * 100
        )
    }

}