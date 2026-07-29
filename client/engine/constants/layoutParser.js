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

    for (const line of lines) {
        const text = line.trim()

        if (!text) {
            flushParagraph()
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