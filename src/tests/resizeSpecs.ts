import fs from "fs";
import sharp from "sharp";
import resizeImage from '../resize'
import renameThumb from '../rename'

describe("Testing resize function", () => {
    const imageName = "palmtunnel.jpg";
    const width = 200;
    const height = 300;
    const outputName = renameThumb(imageName)
    const outputPath = `/workspace/thumb/${outputName}`;

    beforeAll(() => {
        if (fs.existsSync(outputPath)){
            fs.unlinkSync(outputPath);
        }
    })

    it('should reject when an image does not exist', async ()=>{
        await expectAsync(resizeImage("doesntexist.jpg", 200, 200))
        .toBeRejectedWithError("IMAGE DOES NOT EXIST")
    })

    it("Should properly resize an image", async () => {
        await resizeImage(imageName, width, height);

        expect(fs.existsSync(outputPath)).toBeTrue()

        const metadata = await sharp(outputPath).metadata()
        expect(metadata.width).toEqual(width);
        expect(metadata.height).toEqual(height)
    });

    it("should not recreate the thumbnail if it already exists", async() => {
        await resizeImage(imageName, width, height);
        
        const firstStat = fs.statSync(outputPath)
        const firstModified = firstStat.mtimeMs

        await resizeImage(imageName, width, height);

        const secondStat = fs.statSync(outputPath);
        const secondModified = secondStat.mtimeMs;

        expect(secondModified).toEqual(firstModified);
    })
  
  });