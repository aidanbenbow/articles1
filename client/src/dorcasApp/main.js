import { Engine } from '../../engine/core/Engine.js'
import { CommandModule } from '../../engine/modules/commandModule.js'

export function createEngine(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas',
	})

	const commandModule = new CommandModule(engine)

	engine.addModule(commandModule, true)

	return engine
}

export function bootstrapDorcasApp(options = {}) {
	const engine = createEngine(options)
	engine.mount()
	return engine
}
