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

const toolBar = new Node('toolbar', eng.context, {
    color: '#333'
})
eng.context.addNode(
    toolBar,
    'basicScreen'  
)

const messageBar = new Node('messageBar', eng.context, {
    color: '#460cd9'
})
eng.context.addNode(
    messageBar,
    'basicScreen'  
)

const formBar = new Node('formBar', eng.context, {
    color: '#d93c46'
})
eng.context.addNode(
    formBar,
    'basicScreen'  
)
const containerBar = new Node('containerBar', eng.context, {
    color: '#3cd94c'
})
eng.context.addNode(
    containerBar,
    'formBar'  
)