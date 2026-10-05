export function resolveValue(value, context) {
    if (typeof value === 'function') {
        return value(context)
    }

    return value
}