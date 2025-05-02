import express from "express";
import mangaRoute from "./routes/manga.route.js";
const app = express();
app.listen("5000", () => {
    console.log("server started on port 5000");
});
app.use("/api/manga", mangaRoute);
//# sourceMappingURL=server.js.map