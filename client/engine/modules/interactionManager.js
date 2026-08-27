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
                case 'moveOrderingItem':
    this.engine.context.moveOrderingItem(
        targetNode.sectionId,
        targetNode.itemIndex,
        targetNode.direction
    )

    this.emitLayoutChanged()
    return

case 'checkOrdering':
    this.engine.context.checkOrdering(
        targetNode.sectionId
    )

    this.emitLayoutChanged()
    return
                case 'openLesson':
                    const article =
                        targetNode.articleData || null
                  this.engine.context.app.openLesson(article)
                    return
                    case 'browseLessons':
                        this.engine.context.app.openLessonBrowser()
                    
                        return
                        case 'goHome':
                            console.log('InteractionManager: goHome action triggered')
                             this.engine.context.app.goHome()
                           
                            return
            default:
                console.log('No action defined for target node', targetNode)
        }

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

emitLayoutChanged() {
    this.engine.emit(
        'layoutChanged',
        { layout: this.engine.context.getLayout().layoutNodes }
    )
}
}