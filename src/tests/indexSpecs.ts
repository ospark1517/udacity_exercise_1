import express from "express";
import { describe, it } from "node:test";
import supertest from "supertest";
import "jasmine";


describe("Testing all endpoints described in index.ts", () => {
  const app = express();
  it("Should return the main endpoint correctly", () => {
    supertest(app).get("/").expect(200);
  });
});

