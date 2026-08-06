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

if(targetNode.type === 'input') {
    this.state = {
        ...this.state,
        view: 'list',
        focusedNodeId: targetNode.id,

    }
}

if (targetNode.sectionType === 'surveyOption') {
 await this.engine.context.answerSurvey(targetNode.surveyId, targetNode.optionIndex)
 this.emitLayoutChanged()
return
}

if(targetNode.sectionType === 'quizOption') {

   this.engine.context.answerQuiz(targetNode.sectionId,
    targetNode.quizId, targetNode.optionIndex, targetNode.answer)
this.emitLayoutChanged()
   return
}

if (targetNode.sectionType === 'continueButton') {
   
    this.engine.context.advanceLessonSection()
    return
}


if(
    targetNode.kind === 'lessonSection' ||
    targetNode.kind === 'lessonTitle'
) {
    return
}


if(targetNode.type === 'button') {
    this.state = {
        ...this.state,
        view: 'list',
        selectedNodeId: null
    }
   
    this.engine.context.clearSelectedArticle()
    return
} else if(targetNode.type === 'text') {

        this.state = {
            ...this.state,
            view:  'article',
            selectedNodeId: targetNode.id
        }
        const article = targetNode.articleData || null
        const articleId = targetNode.articleId
       const lesson = parseArticle(article)
       
    this.engine.context.startLesson(articleId, lesson.sections)

        this.engine.context.selectArticle(articleId)
      
       // this.engine.context.incrementArticleViews(articleId || null)
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
handleQuizOption(targetNode) {
console.log('handleQuizOption', targetNode)
    const { quizId, optionIndex, answer } = targetNode

   if (quizId in this.state.quizAnswers) {
    return
}

    const correct = optionIndex === answer

    this.state = {
        ...this.state,

        quizAnswers: {
            ...this.state.quizAnswers,

            [quizId]: {
                selected: optionIndex,
                correct
            }
        },

        quizScore:
            this.state.quizScore + (correct ? 1 : 0)
    }

    this.emitLayoutChanged()
}

   async handleSurveyOption(targetNode) {

    const { surveyId, optionIndex } = targetNode


    // store this user's selection
    this.state = {
        ...this.state,

        surveyResponses: {
            ...this.state.surveyResponses,
            [surveyId]: optionIndex
        }
    }


    const updatedResults =
        await this.engine.context.recordSurveyResponse(
            surveyId,
            optionIndex
        )


    // update the cached results used by renderer
    this.state = {
        ...this.state,

        surveyResults: {
            ...this.state.surveyResults,

            [surveyId]: updatedResults
        }
    }


    this.emitLayoutChanged()
}
emitLayoutChanged() {
    this.engine.emit(
        'layoutChanged',
        { layout: this.engine.context.getLayout().layoutNodes }
    )
}
}