import { docClient } from "../http/db.js";
import { registerArticlesHandlers } from "./articlesHandlers.js";
import { ArticlesRepository } from "./articlesRepository.js";
import { ArticlesService } from "./articlesService.js";

export function registerBackend(app) {
const articlesRepo = new ArticlesRepository(docClient)
const articlesService = new ArticlesService(articlesRepo)

registerArticlesHandlers(app, articlesService)
}