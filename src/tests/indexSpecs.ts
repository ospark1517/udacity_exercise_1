import supertest from "supertest";
import app from "../index";
import "jasmine";

const request = supertest(app);

describe("Image endpoint", () => {
  it("returns 200 for the home route", async () => {
    await request.get("/").expect(200);
  });

  it("returns 200 for a valid image resize request", async () => {
    await request
      .get("/images")
      .query({
        filename: "fjord.jpg",
        width: 200,
        height: 200,
      })
      .expect(200);
  });

  it("returns 400 when fileName is missing", async () => {
    const response = await request.get("/images").query({
      width: 200,
      height: 200,
    });
    expect(response.status).toBe(400);
    expect(response.text).toContain("IMAGE NAME NOT SPECIFIED");
  });

  it("returns 400 for invalid file type", async () => {
    const response = await request.get("/images").query({
      filename: "fjord.png",
      width: 200,
      height: 200,
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain("Invalid file type. Must be .jpg");
  });

  it("returns 400 for missing width and height", async () => {
    const response = await request.get("/images").query({
      filename: "fjord.jpg",
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain("HEIGHT AND WIDTH NOT SPECIFIED");
  });

  it("returns 400 for missing width", async () => {
    const response = await request.get("/images").query({
      filename: "fjord.jpg",
      height: 200,
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain("WIDTH NOT SPECIFIED");
  });

  it("returns 400 for missing height", async () => {
    const response = await request.get("/images").query({
      filename: "fjord.jpg",
      width: 200,
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain("HEIGHT NOT SPECIFIED");
  });

  it("returns 400 for invalid dimensions", async () => {
    const response = await request.get("/images").query({
      filename: "fjord.jpg",
      width: -1,
      height: 200,
    });

    expect(response.status).toBe(400);
    expect(response.text).toContain("INVALID DIMENSIONS");
  });

  it("returns 404 when the image does not exist", async () => {
    const response = await request.get("/images").query({
      filename: "doesnotexist.jpg",
      width: 200,
      height: 200,
    });
    expect(response.status).toBe(404);
    expect(response.text).toContain("IMAGE DOES NOT EXIST");
  });
});
