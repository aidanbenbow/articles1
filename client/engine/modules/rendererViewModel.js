export function createRendererViewModel( allnodes,state, lesson) {

    
    const lessonSectionNodes = allnodes.filter(node => node.kind === 'lessonSection')
  
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

    const surveys = allnodes.filter(node => node.kind === 'lessonSection' && node.sectionType === 'survey')
    
    return {
    
       
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

