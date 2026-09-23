import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Integration Test Suite: API Endpoints", (): void => {
  describe("GET /api/images - Success Scenarios", (): void => {
    it("should return status 200 when requesting a valid image with correct width and height", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=fjord&width=200&height=200",
      );
      expect(response.status).toBe(200);
    });
  });

  describe("GET /api/images - Error Handling", (): void => {
    it("should return status 400 if filename parameter is omitted", async (): Promise<void> => {
      const response = await request.get("/api/images?width=200&height=200");
      expect(response.status).toBe(400);
    });

    it("should return status 400 if width or height are negative or invalid", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=fjord&width=-100&height=abc",
      );
      expect(response.status).toBe(400);
    });

    it("should return status 404 if the requested image does not exist on the server", async (): Promise<void> => {
      const response = await request.get(
        "/api/images?filename=not_exists&width=200&height=200",
      );
      expect(response.status).toBe(404);
    });
  });
});
