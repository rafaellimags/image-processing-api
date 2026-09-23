import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { resizeImage } from "../../utils/imageProcess.js";

const images = Router();

images.get("/", async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const widthStr = req.query.width as string;
  const heightStr = req.query.height as string;

  if (!filename || !widthStr || !heightStr) {
    res
      .status(400)
      .send(
        "Missing parameters. Please provide filename, width, and height.",
      );
    return;
  }

  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    res
      .status(400)
      .send("Width and height must be integers greater than zero.");
    return;
  }

  const fullImagePath = path.resolve(`./assets/full/${filename}.jpg`);
  const thumbImagePath = path.resolve(
    `./assets/thumbs/${filename}-${width}x${height}.jpg`,
  );

  if (!fs.existsSync(fullImagePath)) {
    res.status(404).send("The requested image was not found on the server.");
    return;
  }

  try {
    if (fs.existsSync(thumbImagePath)) {
      res.sendFile(thumbImagePath);
      return;
    }

    await resizeImage({
      sourcePath: fullImagePath,
      targetPath: thumbImagePath,
      width,
      height,
    });

    res.sendFile(thumbImagePath);
  } catch (error) {
    res
      .status(500)
      .send(`Internal error processing the image: ${(error as Error).message}`);
  }
});

export default images;
