import path from "path";
import fs from "fs";
import { resizeImage } from "../utils/imageProcess.js";

describe("Unit Test Suite: Image Processing", (): void => {
  const filename = "fjord";
  const width = 200;
  const height = 200;

  const sourcePath = path.resolve(`./assets/full/${filename}.jpg`);
  const targetPath = path.resolve(
    `./assets/thumbs/${filename}-${width}x${height}.jpg`,
  );

  afterAll((): void => {
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  });

  it("should resize and save the image successfully when valid data is provided", async (): Promise<void> => {
    await resizeImage({
      sourcePath,
      targetPath,
      width,
      height,
    });

    expect(fs.existsSync(targetPath)).toBeTrue();
  });

  it("should throw an error when the source image path does not exist", async (): Promise<void> => {
    const invalidSourcePath = path.resolve("./assets/full/non_existent.jpg");

    await expectAsync(
      resizeImage({
        sourcePath: invalidSourcePath,
        targetPath,
        width,
        height,
      }),
    ).toBeRejected();
  });
});
