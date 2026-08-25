import { parseArticle } from "../constants/layoutParser.js"

export class InteractionManager {

    constructor(engine) {
        this.engine = engine
        this.id = 'interactionState'

        this.state = {
            view: 'list',
            selectedNodeId: null,
            searchTerm: '',
            focusedNodeId: null,
   
        }
    }


    contextExports() {
        return {
            getInteractionState: () => this.state,
            getInteractionManager: () => this,
            appendSearchTerm: this.appendSearchTerm.bind(this),
            removeSearchTerm: this.removeSearchTerm.bind(this),
        }
    }
async handleTargetNode(targetNode) {

        if(!targetNode) return
        console.log('TARGET NODE', targetNode)

        switch (targetNode.action) {
            case 'finishLessonSection':
                this.engine.context.finishLesson()
                this.emitLayoutChanged()
                return
            case 'advanceLessonSection':
     
                this.engine.context.advanceLessonSection()
                return
            case 'startLessonPhase':
                this.engine.context.startLessonPhase()
                this.engine.emit('lessonStateChanged', this.engine.context.getLesson())
                return
                case 'answerSurvey':
                await this.engine.context.answerSurvey(targetNode.surveyId, targetNode.optionIndex)
                this.emitLayoutChanged()
                return
            case 'answerQuiz':
                this.engine.context.answerQuiz(targetNode.sectionId,
                    targetNode.quizId, targetNode.optionIndex, targetNode.answer)
                this.emitLayoutChanged()
                return
                case 'openLesson':
                  await  this.openLesson(targetNode)
                    return
                    case 'browseLessons':
                        this.engine.context.app.openLessonBrowser()
                        this.emitLayoutChanged()
                        return
                        case 'goHome':
                            await this.engine.context.goHome()
                            this.emitLayoutChanged()
                            return
            default:
                console.log('No action defined for target node', targetNode)
        }

    }

async openLesson(targetNode) {
    const article =
        targetNode.articleData || null

    if (!article) {
        console.warn(
            'Cannot open lesson: no article data',
            targetNode
        )

        return
    }

    const articleId =
        targetNode.articleId ||
        article.articleId ||
        article.id ||
        null

    const lesson =
        parseArticle(article)

    console.log(
        'PARSED LESSON',
        lesson
    )

    this.engine.context.startLesson(
        lesson
    )

    this.engine.context.selectArticle(
        articleId
    )

    this.state = {
        ...this.state,
        view: 'article',
        selectedNodeId: targetNode.id
    }

    this.engine.emit(
        'lessonStateChanged',
        this.engine.context.getLesson()
    )
}
appendSearchTerm(char) {
    const searchTerm = this.state.searchTerm + char
        this.state = {
            ...this.state,
            searchTerm
        }
       this.engine.emit(
            'searchChanged',
            searchTerm
        )
    }
    removeSearchTerm() {

    const searchTerm =
        this.state.searchTerm.slice(0, -1)

    this.state = {
        ...this.state,
        searchTerm
    }

    this.engine.emit(
        'searchChanged',
        searchTerm
    )
}


    setSearchTerm(term = '') {

        this.state = {
            ...this.state,
            searchTerm: term
        }

        this.engine.emit(
            'searchChanged',
            term
        )
    }
// handleQuizOption(targetNode) {
// console.log('handleQuizOption', targetNode)
//     const { quizId, optionIndex, answer } = targetNode

//    if (quizId in this.state.quizAnswers) {
//     return
// }

//     const correct = optionIndex === answer

//     this.state = {
//         ...this.state,

//         quizAnswers: {
//             ...this.state.quizAnswers,

//             [quizId]: {
//                 selected: optionIndex,
//                 correct
//             }
//         },

//         quizScore:
//             this.state.quizScore + (correct ? 1 : 0)
//     }

//     this.emitLayoutChanged()
// }

//    async handleSurveyOption(targetNode) {

//     const { surveyId, optionIndex } = targetNode


//     // store this user's selection
//     this.state = {
//         ...this.state,

//         surveyResponses: {
//             ...this.state.surveyResponses,
//             [surveyId]: optionIndex
//         }
//     }


//     const updatedResults =
//         await this.engine.context.recordSurveyResponse(
//             surveyId,
//             optionIndex
//         )


//     // update the cached results used by renderer
//     this.state = {
//         ...this.state,

//         surveyResults: {
//             ...this.state.surveyResults,

//             [surveyId]: updatedResults
//         }
//     }


//     this.emitLayoutChanged()
// }
emitLayoutChanged() {
    this.engine.emit(
        'layoutChanged',
        { layout: this.engine.context.getLayout().layoutNodes }
    )
}
}