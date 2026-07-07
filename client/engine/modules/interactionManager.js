export class InteractionManager {

    constructor(engine) {
        this.engine = engine
        this.id = 'interactionState'

        this.state = {
            selectedNodeId: null,
            searchTerm: ''
        }
    }


    contextExports() {
        return {
            getInteractionState: () => this.state,
            getInteractionManager: () => this,
          
        }
    }


    handleTargetNode(targetNode) {

        if(!targetNode) return

        this.state = {
            ...this.state,
            selectedNodeId: targetNode.id
        }

        console.log('InteractionManager: selectedNodeId set to', targetNode.id)
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