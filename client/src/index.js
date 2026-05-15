import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

const basicScreen = new Node('basicScreen','basicScreen', eng.context, {
    color: '#f0f0f0'
})

eng.context.addNode(
    basicScreen,
    'root'  
)


const toolBar = new Node('toolbar','bar', eng.context, {
    x: 0,
    color: '#333'
})
eng.context.addNode(
    toolBar,
    'basicScreen'  
)

const formBar = new Node('formBar','bar', eng.context, {
    x: 2,
    color: '#d93c46'
})
eng.context.addNode(
    formBar,
    'basicScreen'  
)

const messageBar = new Node('messageBar','bar', eng.context, {
    x: 1,
    color: '#460cd9'
})
eng.context.addNode(
    messageBar,
    'basicScreen'  
)


const containerBar = new Node('containerBar','containerBar', eng.context, {
    color: '#3cd94c'
})
eng.context.addNode(
    containerBar,
    'formBar'  
)

const titleNode = new Node('text','text', eng.context, {
    text: 'Dorcas UI',
    color: '#fff'
})
eng.context.addNode(
    titleNode,
    'formBar'  
)