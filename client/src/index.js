import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

// --- Build the UI tree ---
const basicScreen  = new Node('basicScreen',  'basicScreen',  
    { color: '#f0f0f0', zIndex: 0 })
const toolBar      = new Node('toolbar',       'bar',          
    { x: 0, proportion:4, color: '#b08f8f', zIndex: 1 })
const formBar      = new Node('formBar',       'bar',          
    { x: 1, proportion:2, color: '#dccecf', zIndex: 2 })
const messageBar   = new Node('messageBar',    'bar',          
    { x: 6, proportion:4, color: '#8c80a9', zIndex: 3 })
const containerBar = new Node('containerBar',  'containerBar', 
    {order:0, color: '#90c095', zIndex: 4 })
const titleNode    = new Node('text',          'text',        
     { value: 'Raporte', color: '#fff', zIndex: 5 })
const containerBar2 = new Node('containerBar2','containerBar', 
    {order:1, color: '#8ecd94' })
const nameNode     = new Node('nameNode',      'text',         
    { value: 'Nume:', color: '#fff' })
const inputNode    = new Node('inputNode',     'inputBox',     
    { placeholder: 'Type your name here', color: '#e1d0d0' })
const containerBar3 = new Node('containerBar3','containerBar', 
    {order:2, color: '#8ec693' })
const messageNode    = new Node('messageNode',         'text',         
    { value: 'messajul', color: '#fff' })
const messageInputNode    = new Node('messageInputNode',     'inputBox',     
    { placeholder: 'Type your message here', color: '#e1d0d0' })

const containerBar4 = new Node('containerBar4','containerBar',
    {order:3, color: '#8ec693' })
const reportNode    = new Node('reportNode',         'text',         
    { value: 'Raport', color: '#fff' })
const reportInputNode    = new Node('reportInputNode',     'inputBox',     
    { placeholder: 'Type your message here', color: '#e1d0d0' })

const containerBar5 = new Node('containerBar5','containerBar',
    {order:0, color: '#8ec693' })
const reportToDo    = new Node('reportToDo',  'text',         
    { value: 'Raportdefacut', color: '#fff' })
const toDo    = new Node('toDo',     'text',     
    { value: '205', color: '#e1d0d0' })


    const containerBar6 = new Node('containerBar6','containerBar',
    {order:1, color: '#8ec693' })

const containerBar7 = new Node('containerBar7','containerBar',
    {order:2, color: '#8ec693' })

    const buttonNode = new Node('buttonNode', 'button', { value: 'Click me', color: '#e1d0d0' })
    
  
// --- Add all nodes at once, layout runs once at the end ---
eng.context.batchAdd([
    { node: basicScreen,   parentId: 'root' },
    { node: toolBar,       parentId: 'basicScreen' },
    { node: formBar,       parentId: 'basicScreen' },
    { node: messageBar,    parentId: 'basicScreen' },
    { node: containerBar,  parentId: 'formBar' },
    { node: titleNode,     parentId: 'containerBar' },
    { node: containerBar2, parentId: 'formBar' },
    { node: nameNode,      parentId: 'containerBar2' },
    { node: inputNode,     parentId: 'containerBar2' },
    { node: containerBar3, parentId: 'formBar' },
    { node: messageNode,   parentId: 'containerBar3' },
    { node: messageInputNode, parentId: 'containerBar3' },
    { node: containerBar4, parentId: 'formBar' },
    { node: reportNode,    parentId: 'containerBar4' },
    { node: reportInputNode, parentId: 'containerBar4' },
    { node: containerBar5, parentId: 'messageBar' },
    { node: reportToDo,    parentId: 'containerBar5' },
    { node: toDo,          parentId: 'containerBar5' },
    { node: containerBar6, parentId: 'messageBar' },
    { node: containerBar7, parentId: 'formBar' },
    { node: buttonNode,    parentId: 'containerBar7' },
   
])

window.addEventListener('keydown', (e) => {
  eng.emit('keyPress', {
    nodeId: eng.context.focusedNodeId,
    key: e.key,
    code: e.code
  })
})