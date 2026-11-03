export class InputActions {
    constructor(engine) {
        this.engine = engine;

        this.handlers = {
            focusNameInput: node => this.focusNameInput(node),
        };
    }

    focusNameInput(node) {
        console.log("Clicked input:", node.id);
        this.engine.context.setFocusedNode(node.id);
    }
}