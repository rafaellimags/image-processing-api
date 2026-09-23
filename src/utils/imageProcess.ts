import sharp from 'sharp';

export interface ImageResizeParams {
  sourcePath: string;
  targetPath: string;
  width: number;
  height: number;
}

/**
 * Redimensiona uma imagem a partir do caminho de origem e salva no caminho de destino.
 * 
 * @param params Objeto contendo os caminhos de origem/destino e as dimensões desejadas.
 * @returns Promise<void> que resolve quando o processamento e salvamento são concluídos.
 */
export const resizeImage = async ({
  sourcePath,
  targetPath,
  width,
  height,
}: ImageResizeParams): Promise<void> => {
  try {
    await sharp(sourcePath)
      .resize(width, height)
      .toFile(targetPath);
  } catch (error) {
    throw new Error(
      `Erro ao processar e salvar a imagem: ${(error as Error).message}`,
    );
  }
};