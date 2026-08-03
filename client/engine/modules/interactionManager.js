export class InteractionManager {

    constructor(engine) {
        this.engine = engine
        this.id = 'interactionState'

        this.state = {
            view: 'list',
            selectedNodeId: null,
            searchTerm: '',
            focusedNodeId: null,
             quizAnswers: {},
             quizResults: {},
    surveyResponses: {},
    surveyResults: {}
   
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
 await this.handleSurveyOption(targetNode)
return
}

if(targetNode.sectionType === 'quizOption') {
    console.log('InteractionManager: quiz option selected:', targetNode)
   this.handleQuizOption(targetNode)
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
        console.log(this.state)

        this.engine.context.selectArticle(targetNode.props?.articleData?.articleId || null)
       console.log('InteractionManager: text node selected:', targetNode)
        this.engine.context.incrementArticleViews(targetNode.articleId || null)
    } else if(targetNode.type === 'input') {
        console.log('InteractionManager: input node selected:', targetNode)
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
    const correct =
        targetNode.optionIndex === targetNode.answer


    this.state = {
        ...this.state,

        quizAnswers: {
            ...this.state.quizAnswers,
            [targetNode.quizId]: targetNode.optionIndex
        },

        quizResults: {
            ...this.state.quizResults,

            [targetNode.quizId]: {
                selected: targetNode.optionIndex,
                correct
            }
        }
    }


    this.emitLayoutChanged()
    return
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