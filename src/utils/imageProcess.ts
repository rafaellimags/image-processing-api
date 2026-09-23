import sharp from "sharp";

export interface ImageResizeParams {
  sourcePath: string;
  targetPath: string;
  width: number;
  height: number;
}

export const resizeImage = async ({
  sourcePath,
  targetPath,
  width,
  height,
}: ImageResizeParams): Promise<void> => {
  try {
    await sharp(sourcePath).resize(width, height).toFile(targetPath);
  } catch (error) {
    throw new Error(
      `Erro ao processar e salvar a imagem: ${(error as Error).message}`,
      { cause: error },
    );
  }
};
