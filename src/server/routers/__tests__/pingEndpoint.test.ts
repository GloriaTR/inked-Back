import request from "supertest";
import app from "../../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given and endpoint GET '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 200 and message '🏓 pong'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓 pong";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

describe("Given a GET '/comic' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should should respond with status code 404 and error message 'Endpoint Not Found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint Not Found";
      const path = "/comic";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
