let measurementContext = null

export function getTextMeasurementContext() {
    if (measurementContext) {
        return measurementContext
    }

    if (typeof document === 'undefined') {
        throw new Error(
            'Canvas text measurement is unavailable'
        )
    }

    const canvas = document.createElement('canvas')

    measurementContext = canvas.getContext('2d')

    if (!measurementContext) {
        throw new Error(
            'Could not create canvas measurement context'
        )
    }

    return measurementContext
}