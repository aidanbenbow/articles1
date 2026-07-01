import { CanvasModule } from "../engine/modules/canvasModule.js";
import { CommandModule } from "../engine/modules/commandModule.js";
import { Input } from "../engine/modules/input.js";
import { Layout } from "../engine/modules/layout.js";
import { Renderer } from "../engine/modules/Renderer.js";
import { ReportsModule } from "../engine/modules/reports.js";
import { SceneModule } from "../engine/modules/SceneModule.js";
import { TextInputModule } from "../engine/modules/textInput.js";
import { bootstrapDorcas2App } from "./dorcasApp/main.js";


const eng = bootstrapDorcas2App({
    id: 'dorcas2',
    modules: [CommandModule, SceneModule, CanvasModule,ReportsModule, Layout, Renderer, Input,TextInputModule, ],
})

const resultsScreen = eng.context.createNode('resultsScreen', 'flexBar', null, { color: '#ec7575', zIndex: 0, direction: 'row' })

const inputNode = eng.context.createNode('inputNode', 'inputBox', resultsScreen.id, { placeholder: '',width: 200, height: 50 , color: '#e1d0d0', flexGrow: 1 })

const messageInputNode = eng.context.createNode('messageInputNode', 'inputBox', resultsScreen.id, { placeholder: 'Type your message here',width: 400, height: 50 , color: '#d3bdbd', flexGrow: 2 })

const reportInputNode = eng.context.createNode('reportInputNode', 'inputBox', resultsScreen.id, { placeholder: 'Type your report here',width: 400, height: 50 , color: '#bda5a5', flexGrow: 2 })

const copyReportButtonNode = eng.context.createNode('copyReportButtonNode', 'button', reportInputNode.id, { text: 'Copy Report', width: 150, height: 50, color: '#a5a5bd', flexGrow: 1 })

const completeReportButtonNode = eng.context.createNode('completeReportButtonNode', 'button', reportInputNode.id, { text: 'Complete Report', width: 150, height: 50, color: '#a5bdc1', flexGrow: 1 })

const reportsToDoNode = eng.context.createNode('reportsToDoNode', 'text', null, { color: '#c1c1c1', width: 50, height: 50, text: 'Reports To Do',  })