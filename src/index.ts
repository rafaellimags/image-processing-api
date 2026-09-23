import express, { Application } from "express";
import routes from "./routes/index.js";

const app: Application = express();
const port = 3000;

app.use("/api", routes);

app.listen(port, (): void => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
