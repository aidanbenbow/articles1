export const dataStore = {
    articles: [],
    setArticles(articles) {
        this.articles = articles;
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
    }
    contextExports() {
        return {
            getArticles: () => this.dataStore.articles,
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
                height: 50,
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