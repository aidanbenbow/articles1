import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

// --- Build the UI tree ---
const basicScreen  = new Node('basicScreen',  'flexBar',  
    { color: '#f0f0f0', zIndex: 0, direction:'row' })
const toolBar      = new Node('toolBar',       'flexBar',          
    {  flexGrow:2, color: '#b08f8f', zIndex: 1, direction: 'column' })
const formBar     = new Node('formBar',       'flexBar',          
    { flexGrow:4, color: '#dccecf', zIndex: 2, direction: 'column' })
const messageBar   = new Node('messageBar',    'flexBar',          
    { flexGrow:2, color: '#8c80a9', zIndex: 3, direction: 'column' })
const containerBar = new Node('containerBar',  'flexBar', 
    { color: '#90c095', zIndex: 4, flexGrow: 1 })
const titleNode    = new Node('text',          'text',        
     { value: 'Raporte', color: '#fff', zIndex: 5 })
const containerBar2 = new Node('containerBar2','flexBar', 
    { color: '#8ecd94', flexGrow: 1 })
const nameNode     = new Node('nameNode',      'text',         
    { value: 'Nume:', color: '#fff' })
const inputNode    = new Node('inputNode',     'inputBox',     
    { placeholder: 'Type your name here', color: '#e1d0d0', flexGrow: 1 })
const containerBar3 = new Node('containerBar3','flexBar', 
    { color: '#8ec693', flexGrow: 2 })
const messageNode    = new Node('messageNode',         'text',         
    { value: 'messajul', color: '#fff' })
const messageInputNode    = new Node('messageInputNode',     'inputBox',     
    { placeholder: 'Type your message here', color: '#e1d0d0', flexGrow: 2 })

const containerBar4 = new Node('containerBar4','flexBar',
    { color: '#8ec693', flexGrow:5 })
const reportNode    = new Node('reportNode',         'text',         
    { value: 'Raport', color: '#fff' })
const reportInputNode    = new Node('reportInputNode',     'inputBox',     
    { placeholder: 'Type your message here', color: '#e1d0d0', flexGrow: 5 })

const containerBar5 = new Node('containerBar5','flexBar',
    { color: '#8ec693', flexGrow: 0.5 })
const reportToDo    = new Node('reportToDo',  'text',         
    { value: 'Raportdefacut', color: '#fff', flexGrow: 2 })
const toDo    = new Node('toDo',     'text',     
    { value: '205', color: '#e1d0d0', flexGrow: 3 })


    const containerBar6 = new Node('containerBar6','flexBar',
    { color: '#8ec693', flexGrow: 5, gap:2 })

const containerBar7 = new Node('containerBar7','flexBar',
    { color: '#8ec693', flexGrow: 2 })

    const buttonNode = new Node('buttonNode', 'button', { value: 'Click me', color: '#e1d0d0' })

    const copyButtonNode = new Node('copyButtonNode', 'button', { value: 'Copy', color: '#e1d0d0'})
    const pasteButtonNode = new Node('pasteButton', 'button', { value: 'Paste', color: '#e1d0d0'})
    
  const containerBar8 = new Node('containerBar8','flexBar',
    { color: '#8ec693', flexGrow: 7, gap:2 })
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
    { node: containerBar8, parentId: 'messageBar' },
    { node: copyButtonNode, parentId: 'toolBar' },
    { node: pasteButtonNode, parentId: 'toolBar' },
])

window.addEventListener('keydown', (e) => {
  eng.emit('keyPress', {
    nodeId: eng.context.focusedNodeId,
    key: e.key,
    code: e.code
  })
})