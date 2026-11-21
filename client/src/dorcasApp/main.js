import { Engine } from '../../engine/core/Engine.js'
import '../config/amplifyConfig.js'


export function bootstrapDorcas2App(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas2',
		modules: options.modules ?? defaultModules,
		...options,
	})
	engine.mount()

	// Restore an existing Cognito session and learner profile.
    Promise.resolve().then(async () => {
        try {
            await engine.context.app.initializeAuth();
        } catch (error) {
            console.error('Could not initialize authentication:', error);
        }
    });

    return engine;
}
	

