export class ArticlesService {
    constructor(articlesRepo) {
        this.articlesRepo = articlesRepo;
       
    }
    fetchAllArticles() {
        return this.articlesRepo.fetchAllArticles();
    }
    updateArticle(articleId, updates) {
        return this.articlesRepo.updateArticle(articleId, updates);
    }
    markArticleAsComplete(articleId) {
        return this.articlesRepo.markArticleAsComplete(articleId);
    }
}