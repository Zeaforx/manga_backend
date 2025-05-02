import express from "express";
import { getChapterImages, getMangaDetails, getMangaList, } from "../controller/manga.controller.js";
const router = express.Router();
router.get("/", getMangaList);
router.get("/:mangaId/", getMangaDetails);
router.get("/:mangaId/:chapter", getChapterImages);
export default router;
//# sourceMappingURL=manga.route.js.map