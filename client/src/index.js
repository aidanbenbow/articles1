import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

const basicScreen = new Node('basicScreen', eng.context, {
    color: '#f0f0f0'
})

eng.context.addNode(
    basicScreen,
    'root'  
)
