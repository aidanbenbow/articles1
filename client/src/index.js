import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

const basicScreen = new Node('basicScreen', 'basicScreen', {
    color: '#f0f0f0'
})

eng.context.addNode(
    basicScreen,
    'root'  
)


const toolBar = new Node('toolbar', 'bar', {
    x: 0,
    color: '#333'
})
eng.context.addNode(
    toolBar,
    'basicScreen'  
)

const formBar = new Node('formBar', 'bar', {
    x: 2,
    color: '#d93c46'
})
eng.context.addNode(
    formBar,
    'basicScreen'  
)

const messageBar = new Node('messageBar', 'bar', {
    x: 1,
    color: '#460cd9'
})
eng.context.addNode(
    messageBar,
    'basicScreen'  
)


const containerBar = new Node('containerBar', 'containerBar', {
    color: '#3cd94c'
})
eng.context.addNode(
    containerBar,
    'formBar'  
)

const titleNode = new Node('text', 'text', {
    text: 'Dorcas UI',
    color: '#fff'
})
eng.context.addNode(
    titleNode,
    'containerBar'  
)

const containerBar2 = new Node('containerBar2', 'containerBar', {
    color: '#3cd94c'
})
eng.context.addNode(
    containerBar2,
    'formBar'  
)

const nameNode = new Node('nameNode', 'text', {
    text: 'Name:',
    color: '#fff'   
})
eng.context.addNode(
    nameNode,
    'containerBar2'  
)

const inputNode = new Node('inputNode', 'inputBox', {
    text: 'Type your name here',
    color: '#fff'
})
eng.context.addNode(
    inputNode,
    'containerBar2'  
)