export function createRendererViewModel( allnodes,state) {
    const inputNodes = allnodes.filter(node => node.type === 'input')
    const buttonNodes = allnodes.filter(node => node.type === 'button')
    const textNodes = allnodes.filter(node => node.type === 'text' && node.props?.text !== 'Reports To Do')
    const reportsToDoNode = allnodes.find(node => node.kind === 'reportsToDo')
    
    const reportsNodes = allnodes.filter(node => node.type === 'text' && node.kind === 'article')
    const nodeSelected = allnodes.find(node => node.id === state.selectedNodeId)
    return {
        inputNodes,
        buttonNodes,
        textNodes,
        reportsToDoNode,
        reportsNodes,
        nodeSelected
    }
}

function getSearchTerm(layout, inputNodeId) {
    const inputNode = layout.get(inputNodeId)
    return (inputNode?.text || '').trim().toLowerCase()
}

function filterReports(reportNodes, searchTerm) {
    const query = normalize(searchTerm)
    if (!query) return reportNodes
    const compactQuery = query.replace(/\s+/g, ' ')
    return reportNodes.filter(node => {
        const text = normalize(node.text || '')
        const initials = getInitials(text)
        return text.startsWith(query) || initials.startsWith(compactQuery)
    })
}

function normalize(value){
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ')
}

function getInitials(text) {
    return text.
split(' ')
.filter(Boolean)
.map(word => word[0])
.join('')
}