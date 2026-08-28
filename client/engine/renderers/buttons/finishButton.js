
import { renderButton } from "./buttonRenderer.js";

export function renderFinishButton(ctx, node, viewport) {
    renderButton(ctx, node, viewport, {
        defaultText: 'Finish'})
}