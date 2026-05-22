import { Engine } from '../../engine/core/Engine.js'
import { CommandModule } from '../../engine/modules/commandModule.js'
import { SceneGraphModule } from '../../engine/modules/sceneGraphModule.js'
import { RenderModule } from '../../engine/modules/renderModule.js'
import { LayOutModule } from '../../engine/modules/layOutModule.js'
import { InputModule } from '../../engine/modules/inputModule.js'
import { FocusModule } from '../../engine/modules/focusModule.js'
import { TextModule } from '../../engine/modules/textModule.js'
import { NameFilterModule } from '../../engine/modules/nameFilterModule.js'

const defaultModules = [CommandModule,RenderModule, SceneGraphModule, LayOutModule, InputModule, FocusModule, TextModule, NameFilterModule ]

export function bootstrapDorcasApp(options = {}) {
	const engine = new Engine({
		id: options.id ?? 'dorcas',
		modules: options.modules ?? defaultModules,
		...options,
	})
	engine.mount()
	return engine
}
