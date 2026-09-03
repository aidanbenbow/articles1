export function createRendererViewModel( allnodes,state, lesson) {

    const inputNodes = allnodes.filter(node => node.type === 'input')
    const buttonNodes = allnodes.filter(node => node.type === 'button')
    const headerNode = allnodes.find(node => node.type === 'header')
    const textNodes = allnodes.filter(node => node.type === 'text' && node.props?.text !== 'Reports To Do')
   // const reportsToDoNode = allnodes.find(node => node.kind === 'reportsToDo')
    const homeNodes = allnodes.filter(node => node.owner === 'home')
    
    const lessonBrowserNodes = allnodes.filter(node => node.owner === 'lessonBrowser')
    
    //const nodeSelected = allnodes.find(node => node.id === state.selectedNodeId)
    const lessonSectionNodes = allnodes.filter(node => node.kind === 'lessonSection')
    const lessonTitleNodes = allnodes.filter(node =>  node.kind === 'lessonTitle')
    const lessonDescriptionNodes = allnodes.filter(node =>  node.kind === 'lessonDescription')
    const lessonStatsNodes = allnodes.filter(node =>  node.kind === 'lessonStats')

    const currentSection = lesson?.currentSectionIndex ?? 0
    const currentLessonSection = lessonSectionNodes.find(node => node.props?.sectionIndex === currentSection) || null

    const quizAnswers = lesson?.quizAnswers || {}
    const quizScore = lesson?.getScoreTotal ? lesson.getScoreTotal() : 0
    const quizTotal = lesson?.quizTotal || 0
    const surveyResponses = lesson?.surveyResponses || {}
    const surveyResults = lesson?.surveyResults || {}
    const surveyTotal = lesson?.surveyTotal || 0
    const completedSections = lesson?.completedSections || []
    const progress = lesson?.getProgress ? lesson.getProgress() : 0

    const orderingAnswers =
    lesson?.orderingAnswers || {}

const orderingTotal =
    lesson?.orderingTotal || 0
    
    return {
        inputNodes,
        buttonNodes,
        headerNode,
        textNodes,
        homeNodes,
       // reportsToDoNode,
        lessonBrowserNodes,
        lessonSectionNodes,
        lessonTitleNodes,
        lessonDescriptionNodes,
        lessonStatsNodes,
        currentLessonSection,
        currentSection,
        searchTerm: state.searchTerm,

        // Lesson data
        lessonTitle: lesson?.title || '',
        lessonDescription: lesson?.description || '',
        lessonTotal: lesson?.lessonTotal || 0,
        quizAnswers,
        quizScore,
        quizTotal,

        surveyResponses,
        surveyResults,
        surveyTotal,

        completedSections,
        progress,

        orderingAnswers,
        orderingTotal
       
    }
}
