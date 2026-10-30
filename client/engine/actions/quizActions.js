
export class QuizActions {
    constructor(engine) {
        this.engine = engine

        this.handlers = {
            answerSurvey: node => this.answerSurvey(node),
            answerQuiz: node => this.answerQuiz(node),
        }
    }

    async answerSurvey(node) {
        const result = await this.engine.context.answerSurvey(
            node.surveyId,
            node.optionIndex
        )

        if (!result.alreadyAnswered) {
            this.engine.context
                .getAnimationManager()
                .play(
                    'surveyAnswer',
                    `survey-answer-${node.surveyId}`
                )
        }

        this.emitLayoutChanged()
    }

    answerQuiz(node) {
        const lesson = this.engine.context.getLesson()
        const prevScore = lesson?.getScoreTotal() || 0

        const answer = this.engine.context.answerQuiz(
            node.sectionId,
            node.quizId,
            node.optionIndex,
            node.answer
        )

        if (answer.result.isCorrect) {
            const newScore = answer.score + prevScore

            this.engine.context
                .getAnimationManager()
                .play('quizAnswer', 'lesson-score', {
                    from: prevScore,
                    to: newScore
                })
        }

        this.emitLayoutChanged()
    }

    emitLayoutChanged() {
        this.engine.emit('layoutChanged', {
            layout: this.engine.context.getLayout().layoutNodes
        })
    }
}
