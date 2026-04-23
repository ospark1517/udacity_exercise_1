import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import renameThumb from "./rename";

export default async function resizeImage(
  imageName: string,
  imageWidth: number,
  imageHeight: number,
): Promise<void> {
  const thumbName = renameThumb(imageName);
  const ext = path.extname(thumbName);
  const base = path.basename(thumbName, ext);
  const newName = `${base}_${imageWidth}_${imageHeight}${ext}`;

  const imagePath = path.join(__dirname, "../../images");
  const thumbPath = path.join(__dirname, "../../thumb");

  try {
    await fs.access(path.join(imagePath, imageName));
  } catch {
    throw new Error("IMAGE DOES NOT EXIST");
  }

  await fs.mkdir(thumbPath, { recursive: true });

  try {
    await fs.access(path.join(thumbPath, newName));
    return;
  } catch {
    await sharp(path.join(imagePath, imageName))
      .resize(imageWidth, imageHeight)
      .toFile(path.join(thumbPath, newName));
  }
}
