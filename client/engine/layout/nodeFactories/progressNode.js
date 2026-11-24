import { createBaseNode } from "./baseNode.js"

export function createProgressNode({
    id,
    owner = null,
    x,
    worldY,
    width,
    height = 12,
    value = 0,
    trackColor = "#e5e7eb",
    fillColor = "#9481ed",
    radius = 6,
    ...extra
}) {
    return createBaseNode({
        id,
        owner,
        x,
        worldY,
        width,
        height,

        type: "progress",
        kind: "progress",

        interactive: false,

        value: Math.max(0, Math.min(100, Number(value) || 0)),
        trackColor,
        fillColor,
        radius,

        ...extra
    })
}