import supertest from "supertest";
import app from "../../index.js";

const request = supertest(app);

describe("Pruebas de integracion", () => {
  it("GET /api/pais debe responder con un estado 200 y un JSON", async () => {
    const response = await request.get("/api/pais");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
