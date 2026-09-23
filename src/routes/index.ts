import { Router, Request, Response } from "express";
import images from "./api/images.js";

const routes = Router();

routes.get("/", (req: Request, res: Response): void => {
  res.send("API de Processamento de Imagens funcionando!");
});

routes.use("/images", images);

export default routes;
