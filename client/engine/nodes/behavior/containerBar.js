import { rectangle } from "../render/helpers.js";
import { Behavior } from "./behavior.js";

class ContainerBar extends Behavior{
    
    measure(constraints) {
        const offsetX = this.node.offsetX ?? 5
        const offsetY = this.node.offsetY ?? 5
        return {
            width: Math.max((constraints.width ?? 0) - (offsetX * 2), 0),
            height: Math.max(((constraints.height ?? 0) / 5) - (offsetY * 2), 0),
        }
    }
    afterChildrenMeasure(measured, constraints, context) {
        const children = [...(this.node.children ?? [])]
        if (!children.length) return measured

        const paddingX = this.node.paddingX ?? 10
        const paddingY = this.node.paddingY ?? 10
        let contentWidth = 0
        let contentHeight = 0

        for (const childId of children) {
            const child = context?.getNode?.(childId)
            if (!child?.measured) continue
            const childOffsetX = child.offsetX ?? 0
            const childOffsetY = child.offsetY ?? 0
            contentWidth = Math.max(contentWidth, childOffsetX + (child.measured.width ?? 0))
            contentHeight = Math.max(contentHeight, childOffsetY + (child.measured.height ?? 0))
        }

        const minWidth = this.node.minWidth ?? 0
        const minHeight = this.node.minHeight ?? 0
        const targetWidth = Math.max(contentWidth + (paddingX * 2), minWidth)
        const targetHeight = Math.max(contentHeight + (paddingY * 2), minHeight)

        return {
            width: Math.min(targetWidth, constraints.width ?? targetWidth),
            height: Math.min(targetHeight, constraints.height ?? targetHeight),
        }
    }
    layout(measured, context) {
        const parentId = this.node.parentId
        const parent = parentId ? context?.getNode?.(parentId) : null
        const parentX = parent?.layouted?.x ?? parent?.x ?? 0
        const parentY = parent?.layouted?.y ?? parent?.y ?? 0
        const paddingX = this.node.paddingX ?? 5
        const paddingY = this.node.paddingY ?? 5
        const gap = this.node.gap ?? 5

        // Stack below any preceding containerBar siblings
        let stackY = 0
        if (parent) {
            for (const childId of parent.children ?? []) {
                if (childId === this.node.id) break
                const sibling = context?.getNode?.(childId)
                if (sibling?.type === 'containerBar') {
                    stackY += (sibling.measured?.height ?? 0) + gap
                }
            }
        }

        return {
            x: parentX + paddingX,
            y: parentY + paddingY + stackY,
            width: measured.width,
            height: measured.height,
        }
    }
    update() {}
    layoutChildren(node, context) {
        const containerX = node.layouted?.x ?? 0
        const containerY = node.layouted?.y ?? 0
        const paddingX = node.paddingX ?? 10
        const paddingY = node.paddingY ?? 10
        const gap = node.gap ?? 5

        let cursorY = containerY + paddingY
        for (const childId of node.children ?? []) {
            const child = context?.getNode?.(childId)
            if (!child) continue
            const childHeight = child.measured?.height ?? 0
            child.layouted = {
                ...child.layouted,
                x: containerX + paddingX,
                y: cursorY,
                width: (node.layouted?.width ?? 0) - (paddingX * 2),
                height: childHeight,
            }
            cursorY += childHeight + gap
        }
    }
    render(ctx) {
       rectangle(this.node, ctx)
    }
}

export { ContainerBar }
export default ContainerBar