import { articlesModule } from "../engine/modules/articles.js";
import { CanvasModule } from "../engine/modules/canvasModule.js";
import { Input } from "../engine/modules/input.js";
import { Layout } from "../engine/modules/layout.js";
import { Renderer } from "../engine/modules/Renderer.js";
import { SceneModule } from "../engine/modules/SceneModule.js";
import { bootstrapDorcas2App } from "./dorcasApp/main.js";



const eng = bootstrapDorcas2App({
    id: 'articles1',
modules: [SceneModule,
CanvasModule,
Layout,
Renderer,
articlesModule,
Input

]
}
)

const articlesScreen = eng.context.createNode('articlesScreen', 'flexBar', null, { color: '#92e5eb',  direction: 'row' })

const backButtonNode = eng.context.createNode('backButtonNode', 'button', articlesScreen.id, { text: 'back', width: 150, height: 50, color: '#23979d', flexGrow: 1 })