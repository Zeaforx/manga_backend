import express from "express";
import mangaRoute from "./routes/manga.route.js";
import { getMangaList } from "./controller/manga.controller.js";
const app = express();

app.listen("5000", () => {
  console.log("server started on port 5000");
});
app.use("/api/manga", mangaRoute);
