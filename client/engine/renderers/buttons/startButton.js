import { renderButton } from "./buttonRenderer.js"

export function renderStartButton(
    ctx,
    node,
    viewport
) {

    renderButton(ctx, node, viewport, {
        defaultText: 'Start'})
   
}