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


    handleTargetNode(targetNode) {

        if(!targetNode) return

if(targetNode.type === 'input') {
    this.state = {
        ...this.state,
        view: 'list',
        focusedNodeId: targetNode.id
    }
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

       // this.engine.emit('layoutChanged', { layout: this.engine.context.getLayout() })
        this.engine.context.selectArticle(targetNode.props?.articleData?.articleId || null)
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
}