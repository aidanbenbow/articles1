

import { createNameInputNode } from "../nodeFactories/inputNode.js";
import { resolveValue } from "./resolveValue.js";

export function buildNameInputNode(config, context) {
    const {  
        metrics,
        owner,
        currentY,
        contentX,
        contentWidth
    } = context;

    const resolve = (value, fallback = null) =>
        resolveValue(value, context) ?? fallback;
const type = config.type ?? "nameInput";
    const interaction = context.getInteractionState?.();

    const stateKeys = {
        nameInput: "playerName",
        emailInput: "email",
        passwordInput: "password",
        confirmationCodeInput: "confirmationCode"
    };

    const stateKey = stateKeys[type];
    const value = stateKey
        ? interaction?.[stateKey] ?? ""
        : "";

    const defaultPlaceholders = {
        nameInput: "Enter your name...",
        emailInput: "Enter your email...",
        passwordInput: "Enter your password...",
        confirmationCodeInput: "Enter verification code..."
    };

    const placeholder = resolve(
        config.placeholder,
        defaultPlaceholders[type] ?? "Enter text..."
    );
const inputLayout = metrics.nameInput;
    const node = createNameInputNode({
        id: config.id,
        owner: config.owner ?? owner,

        surveyId: resolve(config.surveyId),
        sectionId: resolve(config.sectionId),

        x: resolve(config.x, contentX ?? metrics.padding),
        worldY: resolve(config.worldY, currentY),

        width: resolve(
            config.width,
            Math.min(inputLayout.width, contentWidth ?? metrics.contentWidth)
        ),

        height: resolve(config.height, inputLayout.height),

        color: resolve(config.color, "#ffffff"),

        text: type === "passwordInput"
            ? "•".repeat(value.length)
            : value || placeholder,
        value,
        placeholder,

       padding: resolve(config.padding, inputLayout.padding),

        action: config.action ?? "focusInput",
type,
        kind: type,
        disabled: resolve(config.disabled, false)
    });


    return {
        node,
        currentY: node.worldY + node.height + metrics.padding
    };
}
