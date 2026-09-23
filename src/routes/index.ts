import { Router, Request, Response } from "express";
import images from "./api/images.js";

const routes = Router();

routes.get("/", (req: Request, res: Response): void => {
  res.send("Image Processing API is working!");
});

routes.use("/images", images);

export default routes;
