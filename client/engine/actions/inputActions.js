export class InputActions {
    constructor(engine) {
        this.engine = engine;

        this.handlers = {
            focusNameInput: node => this.focusInput(node),
            openPlayerSelect: () => this.openPlayerSelect(),
            focusInput: node => this.focusInput(node),
        };
    }
focusInput(node) {
        if (!node) return;

        this.engine.context.setFocusedNode(node.id);
        this.engine.emit('focusInput', node);
    }
   
    openPlayerSelect() {
        const interaction =
            this.engine.context.getInteractionManager();

        const name =
            interaction?.getInteractionState()?.playerName ?? "";

        return this.engine.context.app.openPlayerSelect(name);
    }
}