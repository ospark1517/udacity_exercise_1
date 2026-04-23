import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import resizeImage from "../../utilities/resize";
import renameThumb from "../../utilities/rename";

const images = express.Router();

images.get("/", async (req: Request, res: Response): Promise<void> => {
  const imageName: string = req.query.filename as string;
  const imageWidth: number = Number(req.query.width);
  const imageHeight: number = Number(req.query.height);

  const imagesPath = path.join(__dirname, "../../../images");
  const thumbPath = path.join(__dirname, "../../../thumb");

  if (!imageName) {
    res.status(400).send("IMAGE NAME NOT SPECIFIED");
    return;
  }

  if (!imageName.endsWith(".jpg")) {
    res.status(400).send("Invalid file type. Must be .jpg");
    return;
  }

  if (!fs.existsSync(path.join(imagesPath, imageName))) {
    res.status(404).send("IMAGE DOES NOT EXIST");
    return;
  }

  if (!req.query.width && !req.query.height) {
    res.status(400).send("HEIGHT AND WIDTH NOT SPECIFIED");
    return;
  }

  if (!req.query.width) {
    res.status(400).send("WIDTH NOT SPECIFIED");
    return;
  }

  if (!req.query.height) {
    res.status(400).send("HEIGHT NOT SPECIFIED");
    return;
  }

  if (
    imageHeight <= 0 ||
    imageWidth <= 0 ||
    isNaN(imageHeight) ||
    isNaN(imageWidth)
  ) {
    res.status(400).send("INVALID DIMENSIONS");
    return;
  }

  await resizeImage(imageName, imageWidth, imageHeight);

  const thumbName = renameThumb(imageName);
  const ext = path.extname(thumbName);
  const base = path.basename(thumbName, ext);
  const newImageName = `${base}_${imageWidth}_${imageHeight}${ext}`;

  res.sendFile(path.join(thumbPath, newImageName));
  return;
});

export default images;
