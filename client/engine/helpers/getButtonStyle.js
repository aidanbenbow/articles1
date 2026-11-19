export function getButtonStyle(node, context) {
    const styles = context?.responsive?.buttonStyles ?? {}

    // Temporary interaction state
    const uiState = context?.uiState?.get(node.id) ?? {}

    // Persistent lesson state takes priority over hover and pressed.
    if (node.completed) {
        return styles.completed ?? styles.default
    }

    if (node.disabled) {
        return styles.disabled ?? styles.default
    }

    if (uiState.pressed) {
        return styles.active ?? styles.default
    }

    if (uiState.hover) {
        return styles.hover ?? styles.default
    }

    return styles.default
}