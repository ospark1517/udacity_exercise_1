import express from "express";
import router from "./routes/index";
import images from "./routes/api/image";

const app = express();
const port = 3001;

app.use("/", router);
app.use("/images", images);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
