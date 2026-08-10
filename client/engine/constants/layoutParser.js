export function parseArticle(article) {
    const content = article.content || article.article || ''
   
    const lines = content.split('\n')

    const sections = []

    let paragraph = []
    let sectionIndex = 0

    function flushParagraph() {
        if (!paragraph.length) return

        sections.push({
            id: `section-${sectionIndex++}`,
            type: 'paragraph',
            text: paragraph.join(' ').trim()
        })

        paragraph = []
    }

    for (let i = 0; i < lines.length; i++) {
    const text = lines[i].trim()

    if (!text) {
        flushParagraph()
        continue
    }

    if (text === ':::lesson') {
    flushParagraph()

    const { lesson, nextIndex } = parseLesson(lines, i)

    lesson.id = `section-${sectionIndex++}`

    sections.push(lesson)

    i = nextIndex
    continue
}

    if (text === ':::survey') {
    flushParagraph()

    const { survey, nextIndex } = parseSurvey(lines, i)
survey.id = survey.surveyId || `survey-${sectionIndex++}`
    sections.push(survey)

    i = nextIndex
    continue
}

    if (text === ':::quiz') {
        flushParagraph()

        const { quiz, nextIndex } = parseQuiz(lines, i)
quiz.id = quiz.id || `quiz-${sectionIndex++}`
        sections.push(quiz)

        i = nextIndex
        continue
    }

    if (text.startsWith('## ')) {
        flushParagraph()

        sections.push({
            id: `section-${sectionIndex++}`,
            type: 'heading',
            text: text.substring(3)
        })

        continue
    }

    paragraph.push(text)
}

    flushParagraph()

    return {
        id: article.articleId || null,
        title: article.title || '',
        sections
    }
}

function parseLesson(lines, startIndex) {

    const content = []
    let i = startIndex + 1

    while (i < lines.length) {

        const text = lines[i].trim()

        if (text === ':::') {
            break
        }

        content.push(text)
        i++
    }

    return {
        lesson: {
            type: 'paragraph',
            text: content.join(' ').trim()
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
        options: []
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
        answer: -1
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

        i++
    }

    return {
        quiz,
        nextIndex: i
    }
}