// animationManager.js

import { animationDefinitions } from "../animations/animationDefinitions.js"

export class AnimationManager {
    constructor() {
        this.animations = new Map()
        this.definitions = animationDefinitions
        this.requestFrame = null
    }
    contextExports() {
    return {
        getAnimationManager: () => this
    }
}
setRequestFrame(requestFrame) {
    this.requestFrame = requestFrame
}
    animate(id, definition,options = {}) {
    const animation = {
        ...definition,
        ...options
    }
        const start = performance.now()

        this.animations.set(id, {
            start,
            duration: animation.duration??300,
            from: animation.from??0,
            to: animation.to??1,
            easing: animation.easing??(t => t),
            onUpdate: animation.onUpdate??(() => {}),
            onComplete: animation.onComplete
        })
        this.requestFrame?.()
    }
    play(name, id, options={}) {
    const definition = this.definitions[name]
    if (!definition) {
        console.warn(`Animation definition not found: ${name}`)
        return
    }
    this.animate(id, definition,  options )
}

    update(now = performance.now()) {
        for (const [id, animation] of this.animations) {

            const elapsed = now - animation.start
            const progress = Math.min(
                elapsed / animation.duration,
                1
            )
              console.log({
    id,
    now,
    start: animation.start,
    duration: animation.duration,
    elapsed,
    progress,
    from: animation.from,
    to: animation.to
})

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

    hasActiveAnimations() {
    return this.animations.size > 0
    }
}