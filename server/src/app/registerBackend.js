import { docClient } from "../http/db.js";
import { registerDorcasHandlers } from "./dorcasHandlers.js";
import { DorcasRepository } from "./dorcasRepository.js";
import { DorcasService } from "./dorcasService.js";

export function registerBackend(app) {
const repRepo = new DorcasRepository(docClient)
const dorcasService = new DorcasService(repRepo)

registerDorcasHandlers(app, dorcasService);
}