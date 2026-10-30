import { Engine } from '../../engine/core/Engine.js'


export function bootstrapDorcas2App(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas2',
		modules: options.modules ?? defaultModules,
		...options,
	})
	engine.mount()
	return engine
}