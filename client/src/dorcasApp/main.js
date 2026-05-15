import { Engine } from '../../engine/core/Engine.js'
import { CommandModule } from '../../engine/modules/commandModule.js'
import { SceneGraphModule } from '../../engine/modules/sceneGraphModule.js'
import { RenderModule } from '../../engine/modules/renderModule.js'
import { LayOutModule } from '../../engine/modules/layOutModule.js'

const defaultModules = [CommandModule,RenderModule, SceneGraphModule, LayOutModule, ]

export function bootstrapDorcasApp(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas',
		modules: options.modules ?? defaultModules,
		...options,
	})
	engine.mount()
	return engine
}
