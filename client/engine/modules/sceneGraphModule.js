import { Node } from '../nodes/node.js'
import { baseModule } from './baseModule.js'

export class SceneGraphModule extends baseModule {
  static moduleName = 'sceneGraphModule'
  static lifeCycleModule = true

  constructor(engine) {
    super(engine)
    this.id = 'sceneGraphModule'
    this._nodes = new Map()   // id -> node
    this._roots = new Set()   // top-level node ids
  }

  contextExports() {
    return {
      addNode: this.addNode.bind(this),
      updateNode: this.updateNode.bind(this),
      batchAdd: this.batchAdd.bind(this),
      removeNode: this.removeNode.bind(this),
      getNode: this.getNode.bind(this),
      getRoots: this.getRoots.bind(this),
      getParent: this.getParent.bind(this),
     
    }
  }

  // Add a node. If parentId is provided it becomes a child, otherwise a root.
  addNode(node, parentId = null) {
    if (!node?.id) {
      console.warn('[SceneGraphModule] addNode: node must have an id')
      return
    }
    if (this._nodes.has(node.id)) {
      console.warn(`[SceneGraphModule] addNode: node "${node.id}" already exists`)
      return
    }

    node.children ??= []
    node.parentId = parentId ?? null

    this._nodes.set(node.id, node)

    if (parentId) {
      const parent = this._nodes.get(parentId)
      if (parent) {
        if (!parent.children.includes(node.id)) {
          parent.children.push(node.id)
        }
      } else {
        console.warn(`[SceneGraphModule] addNode: parent "${parentId}" not found, adding as root`)
        this._roots.add(node.id)
      }
    } else {
      this._roots.add(node.id)
    }

    return node
  }

  updateNode(nodeId, updaterFn) {
    const node = this._nodes.get(nodeId)
    if (!node) {
      console.warn(`[SceneGraphModule] updateNode: node "${nodeId}" not found`)
      return
    }
   const next = updaterFn(node)
   if(!next) return null
   this._nodes.set(nodeId, next)
   console.log(`[SceneGraphModule] Node`, this._nodes.get(nodeId))
   return next
  }

  // Add multiple nodes silently, then emit a single 'nodesBatchAdded' event.
  // entries: Array of { node, parentId? }
  batchAdd(entries = []) {
    const added = []
    for (const { node, parentId = null } of entries) {
      if (!node?.id) {
        console.warn('[SceneGraphModule] batchAdd: node must have an id')
        continue
      }
      if (this._nodes.has(node.id)) {
        console.warn(`[SceneGraphModule] batchAdd: node "${node.id}" already exists`)
        continue
      }
      node.children ??= []
      node.parentId = parentId ?? null
      this._nodes.set(node.id, node)

      if (parentId) {
        const parent = this._nodes.get(parentId)
        if (parent) {
          if (!parent.children.includes(node.id)) parent.children.push(node.id)
        } else {
          console.warn(`[SceneGraphModule] batchAdd: parent "${parentId}" not found, adding "${node.id}" as root`)
          this._roots.add(node.id)
        }
      } else {
        this._roots.add(node.id)
      }
      
      added.push(node)
    }
    if (added.length) this.engine.emit('nodesBatchAdded', { nodes: added })
      console.log(this._nodes)
    
    return added
  }

  removeNode(id, { removeChildren = true } = {}) {
    const node = this._nodes.get(id)
    if (!node) return

    if (removeChildren) {
      for (const childId of [...node.children]) {
        this.removeNode(childId, { removeChildren: true })
      }
    }

    if (node.parentId) {
      const parent = this._nodes.get(node.parentId)
      if (parent?.children) {
        parent.children = parent.children.filter((childId) => childId !== id)
      }
    } else {
      this._roots.delete(id)
    }

    this._nodes.delete(id)
    this.engine.emit('nodeRemoved', { id })
  }

  getNode(id) {
    return this._nodes.get(id) ?? null
  }

  getRoots() {
    return [...this._roots].map(id => this._nodes.get(id))
  }
  getParent(node) {
    if (!node?.parentId) return null
    return this._nodes.get(node.parentId) ?? null
  }

  attach() {
    const rootNode = new Node('root', 'root')
    this.addNode(rootNode)
    console.log('[SceneGraphModule] attached')
  }

  detach() {
    this._nodes.clear()
    this._roots.clear()
    console.log('[SceneGraphModule] detached')
  }
 
}