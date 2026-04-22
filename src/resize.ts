import fs from "fs";
import sharp from "sharp";
import renameThumb from "./rename";

export default async function resizeImage(
  imageName: string,
  imageWidth: number,
  imageHeight: number,
): Promise<void> {
  const newName = renameThumb(imageName)

  if(!fs.existsSync(`/workspace/images/${imageName}`)){
    throw new Error("IMAGE DOES NOT EXIST")
  }

  if (!fs.existsSync(`/workspace/thumb/${newName}`)) {
    await sharp(`/workspace/images/${imageName}`)
      .resize(imageWidth, imageHeight)
      .toFile(`/workspace/thumb/${newName}`);
  }
}
