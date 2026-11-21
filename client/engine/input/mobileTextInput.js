
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
        input.autocomplete = 'off';
        input.autocapitalize = 'none';
        input.spellcheck = false;
        input.enterKeyHint = 'done';

        Object.assign(input.style, {
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100px',
            height: '40px',
            opacity: '0.01',
            fontSize: '16px',
            zIndex: '9999',
            pointerEvents: 'auto',
        });

        document.body.appendChild(input);

        input.addEventListener('input', () => {
            if (!this.activeNode) return;

            const value = input.value;
const node = this.activeNode;
const interaction = this.engine.context.getInteractionManager();
            node.value = value;
            if (node.type === 'passwordInput') {
                node.text = '•'.repeat(value.length);
            } else {
                node.text = value;
            }
const setters = {
                nameInput: 'setPlayerName',
                emailInput: 'setEmail',
                passwordInput: 'setPassword',
                confirmationCodeInput: 'setConfirmationCode',
            };

            const setter = setters[node.type];

            if (setter) {
                interaction?.[setter]?.(value);
            }
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
const state = this.engine.context.getInteractionState?.() ?? {};
const values = {
            nameInput: state.playerName,
            emailInput: state.email,
            passwordInput: state.password,
            confirmationCodeInput: state.confirmationCode,
        };
        const inputTypes = {
        nameInput: 'text',
        emailInput: 'email',
        passwordInput: 'password',
        confirmationCodeInput: 'text',
    };
    this.element.type = inputTypes[node.type] ?? 'text';
    this.element.inputMode =
        node.type === 'confirmationCodeInput' ? 'numeric' : 'text';
         this.element.value = values[node.type] ?? node.value ?? '';

        // Keep focus directly inside the user's tap interaction.
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
