import { ActionDispatcher } from "../actions/actionDispatcher.js"


export class InteractionManager {

    constructor(engine) {
        this.engine = engine
        this.id = 'interactionState'
this.actionDispatcher = new ActionDispatcher(engine)
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
    handleTargetNode(targetNode) {
        if(!targetNode) return
        this.actionDispatcher.execute(targetNode)
    }
getFocusedNode() {
    return this.engine.context.getFocusedNode?.() ?? null;
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
word: node.text,
wordIndex: node.wordIndex,
wordNode: node,
sectionId: node.sectionId,
dragDropId: node.dragDropId,
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