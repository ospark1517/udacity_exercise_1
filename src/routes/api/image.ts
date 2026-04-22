import express from "express";
import fs from "fs";
import path from "path";
import resizeImage from "../../resize";
import renameThumb from "../../rename";

const images = express.Router();

images.get("/", async (req, res) => {
  const imageName: string = req.query.imageName as string;
  const imageWidth: number = Number(req.query.width);
  const imageHeight: number = Number(req.query.height);

  const imagesPath = path.join(__dirname, "../../../images")
  const thumbPath = path.join(__dirname, "../../../thumb")

  if (!imageName) {
    return res.status(400).send("IMAGE NAME NOT SPECIFIED");
  }

  if (!imageName.endsWith(".jpg")) {
    return res.status(400).send("Invalid file type. Must be .jpg");
  }

  if (!fs.existsSync(path.join(imagesPath, imageName))) {
    return res.status(404).send("IMAGE DOES NOT EXIST");
  }

  if (!req.query.width) {
    return res.status(400).send("WIDTH NOT SPECIFIED");
  }

  if (!req.query.height) {
    return res.status(400).send("HEIGHT NOT SPECIFIED");
  }

  if (
    imageHeight <= 0 ||
    imageWidth <= 0 ||
    isNaN(imageHeight) ||
    isNaN(imageWidth)
  ) {
    return res.status(400).send("INVALID DIMENSIONS");
  }

  await resizeImage(imageName, imageWidth, imageHeight);

  const newImageName = renameThumb(imageName);

  return res.sendFile(path.join(thumbPath, newImageName));
});

export default images;
