export class ScreenTransitionManager {

    constructor(engine) {
        this.engine = engine
        this.animationManager =
            engine.context.getAnimationManager()
        this.opacity = 1
    }
    contextExports() {
        return {
            getTransitionManager: () => this
        }
    }

    transition(callback) {

        this.animationManager.play(
            'screenTransition',
            'screen-out',
            {
                from: 1,
                to: 0,

                onUpdate: opacity => this.setOpacity(opacity),

                onComplete: () => {
                    callback()
                    this.animationManager.play(
                        'screenTransition',
                        'screen-in',
                        { from: 0, to: 1,
                            onUpdate: opacity => this.setOpacity(opacity)
                        }
                    )
                }
            }
        )
     
    }
    setOpacity(opacity) {
        this.opacity = opacity
    }
    getOpacity() {
        return this.opacity
    }
}