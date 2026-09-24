export function createRendererViewModel( allnodes,state, lesson) {

    const inputNodes = allnodes.filter(node => node.type === 'input')
    const buttonNodes = allnodes.filter(node => node.type === 'button')
    const headerNode = allnodes.find(node => node.type === 'header')
    const textNodes = allnodes.filter(node => node.type === 'text' && node.props?.text !== 'Reports To Do')
  
    const homeNodes = allnodes.filter(node => node.owner === 'home')
    
    const lessonBrowserNodes = allnodes.filter(node => node.owner === 'lessonBrowser')
    
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

    const currentSectionState =
    lesson?.getCurrentSectionState?.() || null

const dragDropAnswers =
    currentSectionState?.getAnswers?.() || {}

const dragDropWordbank =
    currentSectionState?.getWordbank?.() || []

const dragDropChecked =
    currentSectionState?.getChecked?.() || false

const dragDropCorrect =
    currentSectionState?.isCorrect?.() || false

const dragDropFeedback =
    currentSectionState?.getFeedback?.() || ''

    const orderingAnswers =
    lesson?.orderingAnswers || {}

const orderingTotal =
    lesson?.orderingTotal || 0

    const surveys = groupSurveyNodesBySurveyId(lessonSectionNodes)
    
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
        orderingTotal,

        // Drag and Drop data
        dragDropAnswers,
        dragDropWordbank,
        dragDropChecked,
        dragDropCorrect,
        dragDropFeedback,

        surveys
        
       
    }
}


function groupSurveyNodesBySurveyId(allnodes) {
const surveys = new Map()

for(const node of allnodes) {
    if(node.sectionType !== 'survey') continue

    surveys.set(node.surveyId, {
surveyId: node.surveyId,
            survey: node,
            question: null,
            response: null,
            options: [],
            feedback: null
        }
    )
}
for(const node of allnodes) {
const group = surveys.get(node.surveyId)
if(!group) continue

switch(node.sectionType) {
    case 'surveyQuestion':
        group.question = node
        break
    case 'surveyResponse':
        group.response = node
        break
    case 'surveyOption':
        group.options.push(node)
        break
    case 'surveyFeedback':
        group.feedback = node
        break 
}
}
for(const group of surveys.values()) {
    group.options.sort((a,b) => a.worldY - b.worldY)
}
return [...surveys.values()]
}