export function createRendererViewModel( allnodes,state, lesson) {
    const inputNodes = allnodes.filter(node => node.type === 'input')
    const buttonNodes = allnodes.filter(node => node.type === 'button')
    const headerNode = allnodes.find(node => node.type === 'header')
    const textNodes = allnodes.filter(node => node.type === 'text' && node.props?.text !== 'Reports To Do')
    const reportsToDoNode = allnodes.find(node => node.kind === 'reportsToDo')
    
    const reportsNodes = allnodes.filter(node => node.type === 'text' && node.kind === 'article')
    //const nodeSelected = allnodes.find(node => node.id === state.selectedNodeId)
    const lessonSectionNodes = allnodes.filter(node => node.kind === 'lessonSection')
    const lessonTitleNodes = allnodes.filter(node =>  node.kind === 'lessonTitle')
    
    return {
        inputNodes,
        buttonNodes,
        headerNode,
        textNodes,
        reportsToDoNode,
        reportsNodes,
        lessonSectionNodes,
        lessonTitleNodes,
        searchTerm: state.searchTerm,

        // Lesson data
        quizAnswers:
            lesson?.quizAnswers || {},

        quizScore:
            lesson?.quizScore || 0,

        quizTotal:
            lesson?.quizTotal || 0,

        surveyResponses:
            lesson?.surveyResponses || {},

        surveyResults:
            lesson?.surveyResults || {},


        completedSections:
            lesson?.completedSections || [],

        progress:
            lesson?.getProgress
                ? lesson.getProgress()
                : 0
       
    }
}
