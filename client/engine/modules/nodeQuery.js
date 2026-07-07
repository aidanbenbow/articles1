export class NodeQuery {
    constructor(nodes) {
        this.nodes = nodes
    }

    getAll() {
        return Array.from(this.nodes.values())
    }

    getByType(type) {
        return this.getAll().filter(node => node.type === type)
    }

    getReports() {
        return this.getAll().filter(node => 
            node.type === 'text' && node.props?.reportData
        )
    }

    getArticles() {
        return this.getAll().filter(node => 
            node.type === 'text' && node.props?.title
        )
    }

    getInputs(parentId = null) {
        return this.getByType('inputBox').filter(node => 
            parentId ? node.parentId === parentId : node.parentId
        )
    }

    getButtons(parentId = null) {
        return this.getByType('button').filter(node => 
            parentId ? node.parentId === parentId : node.parentId
        )
    }

    getSearchBar() {
        return this.getAll().find(node => 
            node.type === 'inputBox' && node.props?.isSearchBar
        )
    }

    getScreenNodes() {
        return this.getAll().filter(node => !node.parentId)
    }

    getReportsToDoNode() {
        return this.getAll().find(node => 
            node.type === 'text' && node.props?.text === 'Reports To Do'
        )
    }
}