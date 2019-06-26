const request = require("supertest");
const endPoints = require("./../../app");

describe("Testing Visitors routes", () => {
  test("Test Main end-point", async () => {
    const response = await request(endPoints).get("/");
    expect(response.statusCode).toBe(200);
  });
});
