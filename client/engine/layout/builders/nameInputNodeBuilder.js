

import { createNameInputNode } from "../nodeFactories/inputNode.js";
import { resolveValue } from "./resolveValue.js";

export function buildNameInputNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY,
        parent,
        contentX,
        contentWidth
    } = context;

    const resolve = (value, fallback = null) =>
        resolveValue(value, context) ?? fallback;

    const interaction = context.getInteractionState?.();

    const value = interaction?.playerName || "";

    const placeholder = resolve(
        config.placeholder,
        "Enter your name..."
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

        text: value || placeholder,
        value,
        placeholder,

       padding: resolve(config.padding, inputLayout.padding),

        action: config.action ?? "focusNameInput",

        disabled: resolve(config.disabled, false)
    });

    if (!parent && layout?.layoutNodes instanceof Map) {
        layout.layoutNodes.set(node.id, node);
    }

    return {
        node,
        currentY: node.worldY + node.height + metrics.padding
    };
}
