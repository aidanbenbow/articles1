import { docClient } from "../http/db.js";
import { registerArticlesHandlers } from "./articlesHandlers.js";
import { ArticlesRepository } from "./articlesRepository.js";
import { ArticlesService } from "./articlesService.js";
import { registerLessonProgressHandlers } from "./lessonProgressHandlers.js";
import { LessonProgressRepository } from "./lessonProgressRepository.js";
import { LessonProgressService } from "./lessonProgressService.js";

export function registerBackend(app) {
const articlesRepo = new ArticlesRepository(docClient)
const articlesService = new ArticlesService(articlesRepo)

registerArticlesHandlers(app, articlesService)

 // Lesson progress
    const lessonProgressRepo =
        new LessonProgressRepository(docClient);

    const lessonProgressService =
        new LessonProgressService(lessonProgressRepo);

    registerLessonProgressHandlers(app, lessonProgressService);
}