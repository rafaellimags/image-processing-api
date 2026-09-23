import path from "path";
import fs from "fs";
import { resizeImage } from "../utils/imageProcess.js";

describe("Suíte de Testes Unitários: Processamento de Imagem", (): void => {
  const filename = "fjord"; // Certifique-se de ter assets/full/fjord.jpg no projeto
  const width = 200;
  const height = 200;

  const sourcePath = path.resolve(`./assets/full/${filename}.jpg`);
  const targetPath = path.resolve(
    `./assets/thumbs/${filename}-${width}x${height}.jpg`,
  );

  // Garantir limpeza da thumb gerada após os testes
  afterAll((): void => {
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  });

  it("deve redimensionar e salvar a imagem com sucesso quando dados válidos forem fornecidos", async (): Promise<void> => {
    await resizeImage({
      sourcePath,
      targetPath,
      width,
      height,
    });

    expect(fs.existsSync(targetPath)).toBeTrue();
  });

  it("deve lançar um erro quando o caminho da imagem de origem não existir", async (): Promise<void> => {
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
