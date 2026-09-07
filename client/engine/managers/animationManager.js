// animationManager.js

export class AnimationManager {
    constructor() {
        this.animations = new Map()
    }
    contextExports() {
    return {
        getAnimationManager: () => this
    }
}
    animate(id, {
        duration = 300,
        from = 0,
        to = 1,
        easing = t => t,
        onUpdate,
        onComplete
    }) {
        const start = performance.now()

        this.animations.set(id, {
            start,
            duration,
            from,
            to,
            easing,
            onUpdate,
            onComplete
        })
    }

    update(now = performance.now()) {
        for (const [id, animation] of this.animations) {

            const elapsed = now - animation.start
            const progress = Math.min(
                elapsed / animation.duration,
                1
            )

            const eased = animation.easing(progress)

            const value =
                animation.from +
                (animation.to - animation.from) * eased

            animation.onUpdate(value)

            if (progress >= 1) {
                animation.onComplete?.()
                this.animations.delete(id)
            }
        }
    }
    getValue(id, now = performance.now()) {

    const animation = this.animations.get(id)

    if (!animation) {
        return null
    }

    const elapsed = now - animation.start

    const progress = Math.min(
        elapsed / animation.duration,
        1
    )

    const eased = animation.easing(progress)

    return animation.from +
        (animation.to - animation.from) * eased
}

    isAnimating(id) {
        return this.animations.has(id)
    }
}