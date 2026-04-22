import express from "express";
import fs from "fs";
import resizeImage from "../../resize";
import renameThumb from "../../rename";

const images = express.Router();

images.get("/", async (req, res) => {
  const imageName: string = String(req.query.imageName);
  const imageWidth: number = Number(req.query.width);
  const imageHeight: number = Number(req.query.height);

  if (!imageName) {
    res.send(400);
    throw Error("IMAGE NAME NOT SPECIFIED");
  }

  if (!imageName.includes(".jpg")) {
    res.send(400);
    throw Error("Invalid file type. Must be .jpg");
  }

  if (!fs.existsSync(`/workspace/images/${imageName}`)) {
    res.send(404);
    throw Error("IMAGE DOES NOT EXIST");
  }

  if (!imageWidth) {
    res.send(400);
    throw Error("WIDTH NOT SPECIFIED");
  }

  if (!imageHeight) {
    res.send(400);
    throw Error("HEIGHT NOT SPECIFIED");
  }

  if (
    imageHeight <= 0 ||
    imageWidth <= 0 ||
    isNaN(imageHeight) ||
    isNaN(imageWidth)
  ) {
    res.send(400);
    throw Error("INVALID DIMENSIONS");
  }

  await resizeImage(imageName, imageWidth, imageHeight);

  const newImageName = renameThumb(imageName);

  res.sendFile(`/workspace/thumb/${newImageName}`);
  res.status(200);
});

export default images;
