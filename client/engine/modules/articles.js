const CATEGORY_KEYWORDS = [
    {
        category: 'Language',
        keywords: ['language', 'english', 'grammar', 'writing', 'vocabulary', 'reading']
    },
    {
        category: 'Technology',
        keywords: ['technology', 'software', 'coding', 'programming', 'ai', 'data', 'digital']
    },
    {
        category: 'Business',
        keywords: ['business', 'career', 'marketing', 'sales', 'startup', 'leadership']
    },
    {
        category: 'Health',
        keywords: ['health', 'nutrition', 'fitness', 'wellbeing', 'mental', 'exercise']
    },
    {
        category: 'Culture',
        keywords: ['history', 'culture', 'tradition', 'society', 'heritage', 'world']
    }
]

export const dataStore = {
    articles: [],
    setArticles(articles) {
        this.articles = buildLessonCatalog(articles)
    },
    getOrderedLessons() {
        return [...this.articles]
    },
    getLessonCategories() {
        return [...new Set(this.articles.map(article => article.lessonCategory))]
    }
}

async function fetchArticles() {
    return fetch('/api/articles')
        .then(res => res.json())
        .then(data => {
            dataStore.setArticles(data)
        })
        .catch(error => {
            console.error('Error fetching articles:', error)
        })
}

export async function initializeDataStore() {
    await fetchArticles()
    return dataStore
}

function buildLessonCatalog(articles = []) {
    return [...articles]
        .map((article, index) => enrichLessonMeta(article, index))
        .sort(compareLessons)
}

function enrichLessonMeta(article = {}, index = 0) {
    const lessonDifficulty = resolveLessonDifficulty(article)

    return {
        ...article,
        lessonCategory: resolveLessonCategory(article),
        lessonDifficulty,
        lessonOrder: resolveLessonOrder(article, index, lessonDifficulty)
    }
}

function compareLessons(a = {}, b = {}) {
    const orderDelta = (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0)

    if (orderDelta !== 0) {
        return orderDelta
    }

    return String(a.title || '').localeCompare(String(b.title || ''))
}

function resolveLessonOrder(article = {}, index = 0, difficulty = 'beginner') {
    const explicitOrder = pickFirstNumber([
        article.lessonOrder,
        article.order,
        article.sequence,
        article.rank,
        article.chapter
    ])

    if (explicitOrder != null) {
        return explicitOrder
    }

    const difficultyBase = {
        beginner: 1000,
        intermediate: 2000,
        advanced: 3000
    }[difficulty] ?? 1000

    return difficultyBase + index
}

function resolveLessonDifficulty(article = {}) {
    const explicit = String(
        article.lessonDifficulty ?? article.difficulty ?? article.level ?? ''
    ).toLowerCase()

    if (explicit.includes('advanced')) {
        return 'advanced'
    }

    if (explicit.includes('intermediate') || explicit.includes('medium')) {
        return 'intermediate'
    }

    if (explicit.includes('beginner') || explicit.includes('easy') || explicit.includes('intro')) {
        return 'beginner'
    }

    return 'beginner'
}

function resolveLessonCategory(article = {}) {
    const explicitCategory = pickExplicitCategory(article)

    if (explicitCategory) {
        return explicitCategory
    }

    const sourceText = [
        article.title,
        article.description,
        article.excerpt,
        article.content,
        article.article
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

    for (const { category, keywords } of CATEGORY_KEYWORDS) {
        if (keywords.some(keyword => sourceText.includes(keyword))) {
            return category
        }
    }

    return 'General'
}

function pickExplicitCategory(article = {}) {
    const fromString = firstNonEmptyString([
        article.category,
        article.topic,
        article.track
    ])

    if (fromString) {
        return toTitleCase(fromString)
    }

    if (Array.isArray(article.tags) && article.tags.length) {
        return toTitleCase(String(article.tags[0]))
    }

    return null
}

function pickFirstNumber(values = []) {
    for (const value of values) {
        const parsed = Number(value)

        if (Number.isFinite(parsed)) {
            return parsed
        }
    }

    return null
}

function firstNonEmptyString(values = []) {
    for (const value of values) {
        const text = String(value ?? '').trim()

        if (text) {
            return text
        }
    }

    return null
}

function toTitleCase(value = '') {
    return String(value)
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word[0]?.toUpperCase() + word.slice(1))
        .join(' ')
}

export class articlesModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'articlesModule'
        this.dataStore = null
        this.currentArticles = []
    }
    contextExports() {
        return {
            getArticles: () => this.dataStore.articles,
            getOrderedLessons: () => this.dataStore.getOrderedLessons(),
            getLessonCategories: () => this.dataStore.getLessonCategories()
        }
    }
    async attach() {
        this.dataStore = await initializeDataStore()
        this.currentArticles = this.dataStore.articles

        this.currentArticles.forEach(article => this.createArticleNode(article))
        this.engine.emit('articlesDataReady', { articles: this.currentArticles })
    }

    createArticleNode(article) {
        const color = randomColor()
        const articleNode = this.engine.context.createNode(
            `article-${article.articleId}`,
            'text',
            null,
            {
                title: article.title,
                content: article.content,
                color: color,
                articleData: article,
                width: 400,
                height: 150,
            }
        )

        return articleNode
    }

}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
}