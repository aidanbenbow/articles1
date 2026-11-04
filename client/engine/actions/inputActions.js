export class InputActions {
    constructor(engine) {
        this.engine = engine;

        this.handlers = {
            focusNameInput: node => this.focusNameInput(node),
            openPlayerSelect: () => this.openPlayerSelect()
        };
    }

    focusNameInput(node) {
        console.log("Clicked input:", node.id);
        this.engine.context.setFocusedNode(node.id);
    }
    openPlayerSelect() {
        const interaction =
            this.engine.context.getInteractionManager();

        const name =
            interaction?.getInteractionState()?.playerName ?? "";

        return this.engine.context.app.openPlayerSelect(name);
    }
}