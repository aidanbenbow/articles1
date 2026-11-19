import { createRendererViewModel } from "../../modules/rendererViewModel.js"

export function buildRenderModel(engine) {
    const context = engine.context

    const appState = context.app.getState()
    const lesson = context.getLesson()
    const viewport = context.getViewport()
    const layout = context.getLayout()

    // These are root nodes only.
    const rootNodes = [...layout.values()]

    const interactionState = context.getInteractionState()
    const interactionManager = context.getInteractionManager()
    const assetManager = context.getAssetManager()
    const animations = context.getAnimationManager()

    const uiState = interactionManager?.getUIState?.()

    // Must be the same metrics used during layout compilation.
    const metrics = context.getResponsiveMetrics()

    const view = createRendererViewModel(
        rootNodes,
        interactionState,
        lesson
    )

    let activeNodes = []

switch (appState.screen) {
    case 'home':
        activeNodes = rootNodes.filter(node => node.owner === 'home')
        break

    case 'playerSelect':
        activeNodes = rootNodes.filter(node => node.owner === 'playerSelect')
        break

        case 'category':
        activeNodes = rootNodes.filter(node => node.owner === 'category')
        break
    case 'analytics':
        activeNodes = rootNodes.filter(node => node.owner === 'analytics')
        break
    case 'lesson':
        activeNodes = rootNodes.filter(node => node.owner === 'lesson')
        break
    default:
        activeNodes = rootNodes
        break
}


    const renderContext = {
        lesson,
        assetManager,
        animations,
        interactionState,
        uiState,
        dragState: interactionManager.dragState,
        view,
        layout: rootNodes,
        metrics,
        responsive: metrics,
        typography: metrics.typography,
        getFocusedNode: context.getFocusedNode,
    }

    return {
        screen: appState.screen,
        viewport,
        rootNodes: activeNodes,
        view,
        context: renderContext,
    }
}