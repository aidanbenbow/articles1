import { parseOrdering } from "./orderParser.js"

export function parseArticle(article) {
    const content = article.content || article.article || ''
   
    const lines = content.split('\n')

    const sections = []

    let orderingTotal = 0
    let sectionIndex = 0
    let lessonTotal = 0
    let quizTotal = 0
    let surveyTotal = 0

    let lessonBlocks = []

    function flushLesson() {
        if (!lessonBlocks.length) return

        sections.push({
            id: `section-${sectionIndex++}`,
            type: 'lesson',
            text: lessonBlocks
        })
lessonTotal++
        lessonBlocks = []
    }

    for (let i = 0; i < lines.length; i++) {
    const text = lines[i].trim()

    if (!text) {
        continue
    }

    if (text === ':::lesson') {
    flushLesson()

    const { lesson, nextIndex } = parseLesson(lines, i)

    sections.push({
                id: `section-${sectionIndex++}`,
                type: 'lesson',
                blocks: lesson.blocks
            })
            lessonTotal++

    i = nextIndex
    continue
}

    if (text === ':::survey') {
    flushLesson()

    const { survey, nextIndex } = parseSurvey(lines, i)
survey.id = survey.surveyId || `survey-${sectionIndex++}`
    sections.push(survey)
surveyTotal++
    i = nextIndex
    continue
}

    if (text === ':::quiz') {
        flushLesson()

        const { quiz, nextIndex } = parseQuiz(lines, i)
quiz.id = quiz.id || `quiz-${sectionIndex++}`
        sections.push(quiz)
quizTotal++
        i = nextIndex
        continue
    }

    if (text.startsWith('## ')) {
        lessonBlocks.push({
            type: 'heading',
            text: text.substring(3).trim()
        })

        continue
    }
    if (text === ':::ordering') {
    flushLesson()

    const { ordering, nextIndex } = parseOrdering(lines, i)

    ordering.id = ordering.id || `ordering-${sectionIndex++}`

    sections.push(ordering)
    orderingTotal++

    i = nextIndex
    continue
}

 lessonBlocks.push({
        type: 'paragraph',
        text: text
    })
}

    flushLesson()
    
            
    return {
        id: article.articleId || null,
        title: article.title || '',
        description: article.description || '',
        sections,
        lessonTotal,
        quizTotal,
        surveyTotal,
        orderingTotal
    }
}

function parseLesson(lines, startIndex) {
    const blocks = []

    let paragraph = []

    let i = startIndex + 1

    function flushParagraph() {
        if (!paragraph.length) {
            return
        }

        blocks.push({
            type: 'paragraph',
            text: paragraph.join(' ').trim()
        })

        paragraph = []
    }

    while (i < lines.length) {

        const text =
            lines[i].trim()

        if (text === ':::') {
            break
        }

        if (!text) {
            flushParagraph()
            i++
            continue
        }

        if (text.startsWith('## ')) {
            flushParagraph()

            blocks.push({
                type: 'heading',
                text: text.substring(3)
            })

            i++
            continue
        }

        paragraph.push(text)

        i++
    }

    flushParagraph()

    return {
        lesson: {
            type: 'lesson',
            blocks
        },

        nextIndex: i
    }
}

function parseSurvey(lines, startIndex) {

    const survey = {
        type: 'survey',
        surveyId: '',
        question: '',
        surveyType: 'single',
        options: [],
        feedback: ''
    }

    let i = startIndex + 1

    while (i < lines.length) {

        const line = lines[i].trim()

        if (line === ':::') break

        if (line.startsWith('id:')) {
            survey.surveyId = line.substring(3).trim()
        }
        else if (line.startsWith('question:')) {
            survey.question = line.substring(9).trim()
        }
        else if (line.startsWith('type:')) {
            survey.surveyType = line.substring(5).trim()
        }
        else if (line.startsWith('- ')) {
            survey.options.push(line.substring(2).trim())
        }
        else if (line.startsWith('feedback:')) {
            survey.feedback = line.substring('feedback:'.length).trim()
        }

        i++
    }

    return {
        survey,
        nextIndex: i
    }
}

function parseQuiz(lines, startIndex) {
    const quiz = {
        type: 'quiz',
        question: '',
        options: [],
        answer: -1,
        feedback: ''
    }

    let i = startIndex + 1

    while (i < lines.length) {
        const line = lines[i].trim()

        if (line === ':::') {
            break
        }

        if (line.startsWith('question:')) {
            quiz.question = line
                .substring('question:'.length)
                .trim()
        } else if(line.startsWith('id:')) {
            quiz.id = line.substring(3).trim()
        }
        else if (line.startsWith('- ')) {

            let option = line.substring(2).trim()

            const correct = option.endsWith('*')

            if (correct) {
                option = option.slice(0, -1).trim()
                quiz.answer = quiz.options.length
            }

            quiz.options.push(option)
        }
        else if (line.startsWith('feedback:')) {
    quiz.feedback =
        line.substring('feedback:'.length).trim()
}

        i++
    }

    return {
        quiz,
        nextIndex: i
    }
}