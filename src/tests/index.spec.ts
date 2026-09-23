import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Suíte de Testes de Integração: Endpoints da API", (): void => {
  describe("GET /api/images - Cenários de Sucesso", (): void => {
    it("deve retornar status 200 ao solicitar uma imagem válida com largura e altura corretas", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=fjord&width=200&height=200",
      );
      expect(response.status).toBe(200);
    });
  });

  describe("GET /api/images - Tratamento de Erros", (): void => {
    it("deve retornar status 400 se o parâmetro filename for omitido", async (): Promise<void> => {
      const response = await request.get("/api/images?width=200&height=200");
      expect(response.status).toBe(400);
    });

    it("deve retornar status 400 se largura ou altura forem negativas ou inválidas", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=fjord&width=-100&height=abc",
      );
      expect(response.status).toBe(400);
    });

    it("deve retornar status 404 se a imagem solicitada não existir no servidor", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=nao_existe&width=200&height=200",
      );
      expect(response.status).toBe(404);
    });
  });
});
