import { Node } from '../engine/nodes/node.js'
import { bootstrapDorcasApp } from './dorcasApp/main.js'

const eng = bootstrapDorcasApp()

// --- Build the UI tree ---
const basicScreen  = new Node('basicScreen',  'basicScreen',  { color: '#f0f0f0' })
const toolBar      = new Node('toolbar',       'bar',          { x: 0, proportion:4, color: '#333' })
const formBar      = new Node('formBar',       'bar',          { x: 1, proportion:2, color: '#d93c46' })
const messageBar   = new Node('messageBar',    'bar',          { x: 6, proportion:4, color: '#460cd9' })
const containerBar = new Node('containerBar',  'containerBar', {order:0, color: '#3cd94c' })
const titleNode    = new Node('text',          'text',         { text: 'Raporte', color: '#fff' })
const containerBar2 = new Node('containerBar2','containerBar', {order:1, color: '#3cd94c' })
const nameNode     = new Node('nameNode',      'text',         { text: 'Nume:', color: '#fff' })
const inputNode    = new Node('inputNode',     'inputBox',     { text: 'Type your name here', color: '#e1d0d0' })
const containerBar3 = new Node('containerBar3','containerBar', {order:2, color: '#3cd94c' })
const messageNode    = new Node('messageNode',         'text',         { text: 'messajul', color: '#fff' })
const messageInputNode    = new Node('messageInputNode',     'inputBox',     { text: 'Type your message here', color: '#e1d0d0' })


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
])