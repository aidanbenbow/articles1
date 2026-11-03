export function getNameInputLayout(compact) {
    return {
        height: compact ? 55 : 65,
        width: compact ? 300 : 400,
        padding: compact ? 8 : 10,
        gap: compact ? 8 : 10,
    }
}