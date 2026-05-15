import { rectangle } from "../render/helpers.js"
import { Behavior } from "./behavior.js"

export class BarBehavior extends Behavior {
    constructor(node){
        super(node)
    }
    getBarSiblings(context) {
        const parent = context?.getParent?.(this.node) ?? this.getParent()
        if (!parent) {
            return { parent: null, siblings: [this.node], index: 0 }
        }

        const siblings = [...(parent.children ?? [])]
            .map((childId) => context?.getNode?.(childId))
            .filter((child) => child?.type === 'bar')

        const safeSiblings = siblings.length ? siblings : [this.node]
        const foundIndex = safeSiblings.findIndex((child) => child?.id === this.node.id)

        return {
            parent,
            siblings: safeSiblings,
            index: foundIndex >= 0 ? foundIndex : 0,
        }
    }
    measure(constraints, context) {
        const { siblings } = this.getBarSiblings(context)
        
        const availableWidth = constraints?.width ?? 0
        const height = constraints?.height ?? 0

        return {
            width: availableWidth / Math.max(siblings.length, 1),
            height,
        }
    }
    layout(measured, context) {
        const { parent, siblings, index } = this.getBarSiblings(context)
        const parentX = parent?.layouted?.x ?? parent?.x ?? 0
        const parentY = parent?.layouted?.y ?? parent?.y ?? 0
        const parentWidth = parent?.layouted?.width ?? parent?.measured?.width ?? measured.width

        const slotWidth = parentWidth / Math.max(siblings.length, 1)
        const x = parentX + (slotWidth * index)
        const y = parentY + (this.node.offsetY ?? 0)

        return { x, y, width: slotWidth, height: measured.height }
    }
    update() {}
    render(ctx) {
        rectangle(this.node, ctx)
    }
}