import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../../utils/imageProcess.js';

const images = Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const widthStr = req.query.width as string;
  const heightStr = req.query.height as string;

  // 1. Validação de parâmetros ausentes
  if (!filename || !widthStr || !heightStr) {
    res.status(400).send('Parâmetros ausentes. Por favor, informe filename, width e height.');
    return;
  }

  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  // 2. Validação de valores numéricos para largura e altura
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    res.status(400).send('Largura e altura devem ser números inteiros maiores que zero.');
    return;
  }

  const fullImagePath = path.resolve(`./assets/full/${filename}.jpg`);
  const thumbImagePath = path.resolve(
    `./assets/thumbs/${filename}-${width}x${height}.jpg`,
  );

  // 3. Validação de existência da imagem original
  if (!fs.existsSync(fullImagePath)) {
    res.status(404).send('A imagem solicitada não foi encontrada no servidor.');
    return;
  }

  try {
    // 4. Mecanismo de Cache em Disco: se já existir na pasta thumbs, serve diretamente
    if (fs.existsSync(thumbImagePath)) {
      res.sendFile(thumbImagePath);
      return;
    }

    // 5. Caso contrário, processa a imagem, salva em thumbs e envia
    await resizeImage({
      sourcePath: fullImagePath,
      targetPath: thumbImagePath,
      width,
      height,
    });

    res.sendFile(thumbImagePath);
  } catch (error) {
    res.status(500).send(`Erro interno ao processar a imagem: ${(error as Error).message}`);
  }
});

export default images;