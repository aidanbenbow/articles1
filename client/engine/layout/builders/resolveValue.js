export function resolveValue(value, context) {
    if (typeof value === 'function') {
        return value(context)
    }

    if(typeof value === 'string' && value in context) {
        return context[value]
    }

    return value
}