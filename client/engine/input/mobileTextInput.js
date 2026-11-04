
export class MobileTextInput {
    constructor(engine) {
        this.engine = engine;
        this.element = null;
        this.activeNode = null;
    }

    attach() {
        if (this.element) return;

        const input = document.createElement('input');

        input.type = 'text';
        input.autocomplete = 'name';
        input.autocapitalize = 'words';
        input.spellcheck = false;
        input.enterKeyHint = 'done';

        Object.assign(input.style, {
            position: 'fixed',
            left: '0',
            top: '0',
            width: '1px',
            height: '1px',
            opacity: '0.01',
            fontSize: '16px',
            zIndex: '1',
            pointerEvents: 'auto',
        });

        document.body.appendChild(input);

        input.addEventListener('input', () => {
            if (!this.activeNode) return;

            const value = input.value;

            this.activeNode.value = value;
            this.activeNode.text = value;

            this.engine.context
                .getInteractionManager()
                ?.setPlayerName(value);
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                input.blur();
            }
        });

        this.element = input;
    }

    focus(node) {
        if (!this.element || !node || node.disabled) return;

        this.activeNode = node;

        const savedName =
            this.engine.context.getInteractionState()
                ?.playerName ?? '';

        this.element.value = savedName;

        // Call focus directly from the user's tap action.
        this.element.focus({ preventScroll: true });
    }

    blur() {
        this.element?.blur();
        this.activeNode = null;
    }

    detach() {
        this.element?.remove();
        this.element = null;
        this.activeNode = null;
    }
}
