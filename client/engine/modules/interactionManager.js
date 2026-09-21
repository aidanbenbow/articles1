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
        this.dragState = null
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
       // console.log('TARGET NODE', targetNode)
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
            const result = await this.engine.context.answerSurvey(targetNode.surveyId, targetNode.optionIndex)
                if (!result.alreadyAnswered) {

        this.engine.context
            .getAnimationManager()
            .play('surveyAnswer', `survey-answer-${targetNode.surveyId}`,)
    }
                this.emitLayoutChanged()
                return
            case 'answerQuiz':
                const lessonState = this.engine.context.getLesson()
                const prevScore = lessonState?.getScoreTotal() || 0
              const answer = this.engine.context.answerQuiz(targetNode.sectionId,
                    targetNode.quizId, targetNode.optionIndex, targetNode.answer)
                    const newScore = answer?.score + prevScore 
               
                    if(answer.result.isCorrect) {
                        this.engine.context.getAnimationManager().play('quizAnswer', `quiz-answer-${targetNode.quizId}-correct`,
                            {
                                from: prevScore,
                                to: newScore
                            }
                        )    
                    }    
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
    case 'checkDragDrop':
    this.engine.context.checkDragDrop(
        targetNode.sectionId
    )
    this.emitLayoutChanged()
    return
                case 'openLesson':
                    const article = targetNode.articleData || targetNode || null
                    
                  this.engine.context.app.openLesson(article)
                    return
                    case 'browseLessons':
                        this.engine.context.app.openLessonBrowser()
                    
                        return
                        case 'goHome':
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
startDrag(node, pointer) {
    
    if(!node || !pointer) return
    this.dragState = {
word: node.word,
wordNode: node,
        startX: pointer.x,
        startY: pointer.y,
        x: pointer.x,
        y: pointer.y,
    }
    this.engine.emit('dragChanged', this.dragState)
}
updateDrag(pointer) {
    if(!this.dragState || !pointer) return
    this.dragState = {
        ...this.dragState,
        x: pointer.x,
        y: pointer.y,
    }
    
    this.engine.emit('dragChanged', this.dragState)
}
endDrag() {
    const completedDragState = this.dragState
    this.dragState = null
    this.engine.emit('dragChanged', null)
    return completedDragState
}
cancelDrag(){
    if(!this.dragState) return
    this.engine.emit('dragChanged', null)
    this.dragState = null
}
completeDrop(drag, dropTarget) {
    const word = drag.word
    const gapIndex = dropTarget.gapIndex

    
    const sectionId = dropTarget.sectionId
    const lesson = this.engine.context.getLesson()
    const activity = lesson.activities[sectionId]

    activity.placeWord(gapIndex, word)

    this.dragState = null

    this.engine.emit('dragChanged', null)
    this.emitLayoutChanged()
}
}