
export function getTypography(context, role = "body") {

    // Support both the direct layout and legacy context structure
    const typography =
        context?.typography ??
        context?.responsive?.typography ??
        {};

    return (
        typography[role] ??
        typography.body ??
        {
            size: 14,
            weight: 400,
            lineHeight: 20
        }
    );
}

export function getCanvasFont(context, role = "body") {

    const typography =
        context?.typography ??
        context?.responsive?.typography ??
        {};

    const style = getTypography(context, role);

    const family =
        style.family ??
        typography.family ??
        "sans-serif";

    return `${style.weight ?? 400} ${style.size ?? 14}px ${family}`;
}

export function getTextColor(context, role = "body") {

    const style = getTypography(context, role);

    return style.color ?? 
    context?.responsive?.colors?.text ??
    "#4b5563";
}
