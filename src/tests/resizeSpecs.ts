import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import resizeImage from "../utilities/resize";
import renameThumb from "../utilities/rename";

describe("resizeImage function", () => {
  const imageName = "palmtunnel.jpg";
  const width = 200;
  const height = 300;
  const outputName = renameThumb(imageName);
  const thumbPath = path.join(__dirname, "../../thumb");
  const outputPath = path.join(thumbPath, outputName);

  beforeAll(async () => {
    try {
      await fs.access(outputPath);
      await fs.unlink(outputPath);
    } catch {
      // file does not exist yet
    }
  });

  it("should reject when an image does not exist", async () => {
    await expectAsync(
      resizeImage("doesntexist.jpg", 200, 200),
    ).toBeRejectedWithError("IMAGE DOES NOT EXIST");
  });

  it("Should properly resize an image", async () => {
    await resizeImage(imageName, width, height);

    await expectAsync(fs.access(outputPath)).toBeResolved();

    const metadata = await sharp(outputPath).metadata();
    expect(metadata.width).toEqual(width);
    expect(metadata.height).toEqual(height);
  });

  it("should not recreate the thumbnail if it already exists", async () => {
    await resizeImage(imageName, width, height);

    const firstStat = await fs.stat(outputPath);
    const firstModified = firstStat.mtimeMs;

    await resizeImage(imageName, width, height);

    const secondStat = await fs.stat(outputPath);
    const secondModified = secondStat.mtimeMs;

    expect(secondModified).toEqual(firstModified);
  });
});
