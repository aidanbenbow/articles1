const measureCanvas =
    document.createElement('canvas')

const measureCtx =
    measureCanvas.getContext('2d')

export function measureText(
    text,
    typography
) {
    if (!measureCtx) {
        return 0
    }

    if (!typography) {
        return 0
    }

    measureCtx.font =
        `${typography.weight} ` +
        `${typography.size}px ` +
        `${typography.family}`

    return measureCtx.measureText(
        text ?? ''
    ).width
}

export function measureTextWithPadding(
    text,
    typography,
    paddingX = 0
) {
    return (
        measureText(text, typography) +
        paddingX * 2
    )
}

export function measureTextByStyle(
    text,
    typography,
    style = 'body'
) {
    const typo =
        typography?.[style] ??
        typography?.body

    if (!typo) {
        return 0
    }

    return measureText(
        text,
        typo
    )
}