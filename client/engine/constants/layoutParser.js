export function parseArticle(article) {
    const content = article?.props?.articleData?.content ||
            article?.props?.articleData?.article ||
            ''
    const lines = content.split('\n')

    const sections = []

    let paragraph = []

    function flushParagraph() {
        if (!paragraph.length) return

        sections.push({
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

    if (text === ':::quiz') {
        flushParagraph()

        const { quiz, nextIndex } = parseQuiz(lines, i)

        sections.push(quiz)

        i = nextIndex
        continue
    }

    if (text.startsWith('## ')) {
        flushParagraph()

        sections.push({
            type: 'heading',
            text: text.substring(3)
        })

        continue
    }

    paragraph.push(text)
}

    flushParagraph()

    return {
        id: article?.props?.articleData?.articleId || null,
        title: article?.props?.articleData?.title || '',
        sections
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