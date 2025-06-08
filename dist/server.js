import express from "express";
import mangaRoute from "./routes/manga.route.js";
import cors from "cors";
const app = express();
app.use(cors());
app.listen("5000", () => {
    console.log("server started on port 5000");
});
app.use("/api/manga", mangaRoute);
//# sourceMappingURL=server.js.map