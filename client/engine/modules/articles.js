export const dataStore = {
    articles: [],
    groupedLessons: {},
    setArticles(articles) {
        this.articles = articles;
        this.groupedLessons = articles.reduce((group, article) => {
             const category = article.category || 'Uncategorized';
            if (!group[category]) {
                group[category] = [];
            }
            group[category].push(article);
            return group;
        }, {});
    }
}

async function fetchArticles() {
    return fetch('/api/articles')
        .then(res => res.json())
        .then(data => {
            dataStore.setArticles(data);
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        });
}

export async function initializeDataStore() {
  await fetchArticles();
 return dataStore
}

export class articlesModule {
    constructor(engine) {
        this.engine = engine
        this.id = 'articlesModule'
        this.dataStore = null
        this.currentArticles = []
        this.groupedLessons = {}
    }
    contextExports() {
        return {
            getArticles: () => this.dataStore.articles,
            getGroupedLessons: () => this.dataStore.groupedLessons,
            getCAtegories: () => Object.keys(this.dataStore.groupedLessons),
            getArticleByCategory: (category) => this.dataStore.groupedLessons[category] || [],

            getArticleById: (articleId) =>
            this.dataStore.articles.find(
                article => article.articleId === articleId
            ),
        }
    }
    async attach() {
        this.dataStore = await initializeDataStore()
        this.currentArticles = this.dataStore.articles
        
        this.currentArticles.forEach(article => this.createArticleNode(article))
        this.groupedLessons = this.dataStore.groupedLessons
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
                category: article.category,
                color: color,
                articleData: article,
                width: 400,
                height: 150,
            }
        );
        
        return articleNode;
    }

}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
}

export function getRandomArticleId() {
    const articles = dataStore.articles

    if (!articles || articles.length === 0) {
        return null
    }

    const randomIndex = Math.floor(
        Math.random() * articles.length
    )

    return articles[randomIndex].articleId
}