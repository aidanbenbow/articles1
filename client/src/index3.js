import { ArticleLayoutFeature } from "../engine/modules/articleLayoutFeature.js";
import { articlesModule } from "../engine/modules/articles.js";
import { CanvasModule } from "../engine/modules/canvasModule.js";
import { Input } from "../engine/modules/input.js";
import { InteractionManager } from "../engine/modules/interactionManager.js";
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
InteractionManager,
Input,
ArticleLayoutFeature

]
}
)

const articlesScreen = eng.context.createNode('articlesScreen', 'flexBar', null, { color: '#92e5eb',  direction: 'row' })

const inputNode = eng.context.createNode('inputNode', 'inputBox', articlesScreen.id, { placeholder: '',width: 200, height: 50 , color: '#e1d0d0', flexGrow: 1 })

const backButtonNode = eng.context.createNode('backButtonNode', 'button', articlesScreen.id, { text: 'back', width: 150, height: 50, color: '#23979d', flexGrow: 1 })