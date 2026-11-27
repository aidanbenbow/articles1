import { ActionDispatcher } from "../actions/actionDispatcher.js"
import { UIState } from "../state/UI/uiState.js"


export class InteractionManager {

    constructor(engine) {
        this.engine = engine
        this.id = 'interactionState'
        this.uiState = new UIState(engine)
       
this.actionDispatcher = new ActionDispatcher(engine)
        this.state = {
            view: 'list',
            selectedNodeId: null,
            searchTerm: '',
            focusedNodeId: null,
            playerName: '',
            email: '',
    password: '',
    confirmationCode: '',
        }
        this.dragState = null
    }
    contextExports() {
        return {
            getInteractionState: () => this.getInteractionState(),
            getInteractionManager: () => this,
            appendSearchTerm: this.appendSearchTerm.bind(this),
            removeSearchTerm: this.removeSearchTerm.bind(this),
            getUIState: () => this.getUIState(),
            setEmail: this.setEmail.bind(this),
            setPassword: this.setPassword.bind(this),
            setConfirmationCode: this.setConfirmationCode.bind(this),
        }
    }
    getUIState() {
        return this.uiState
    }
    getInteractionState() {
    return this.state;
}
  handleTargetNode(targetNode) {
    if (!targetNode) return
    return this.actionDispatcher.execute(targetNode)
}

setPlayerName(value = '') {
    this.state = {
        ...this.state,
        playerName: value
    };

   
    this.emitLayoutChanged();
}
setEmail(value = '') {
    this.state = { ...this.state, email: value };
    this.emitLayoutChanged();
}

setPassword(value = '') {
    this.state = { ...this.state, password: value };
    this.emitLayoutChanged();
}

setConfirmationCode(value = '') {
    this.state = { ...this.state, confirmationCode: value };
    this.emitLayoutChanged();
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