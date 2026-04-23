import express from "express";
import router from "./routes/index";
import images from "./routes/api/image";

const app = express();

app.use("/", router);
app.use("/images", images);

export default app;
