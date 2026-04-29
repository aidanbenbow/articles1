import { Engine } from '../../engine/core/Engine.js'
import { CommandModule } from '../../engine/modules/commandModule.js'
import { SceneGraphModule } from '../../engine/modules/sceneGraphModule.js'
import { RenderModule } from '../../engine/modules/renderModule.js'

export function createEngine(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas',
	})

	const commandModule = new CommandModule(engine)
	const sceneGraphModule = new SceneGraphModule(engine)
	const renderModule = new RenderModule(engine)

	engine.addModule(commandModule, true)
	engine.addModule(sceneGraphModule, true)
	engine.addModule(renderModule, true)

	return engine
}

export function bootstrapDorcasApp(options = {}) {
	const engine = createEngine(options)
	engine.mount()
	return engine
}
