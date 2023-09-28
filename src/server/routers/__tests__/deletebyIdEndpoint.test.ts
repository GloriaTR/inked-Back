import { MongoMemoryServer } from "mongodb-memory-server";
import admin from "firebase-admin";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import tokenMock from "../../../mocks/tokenMock.js";
import userMock from "../../../mocks/userMock.js";
import User from "../../../database/models/User.js";
import Comic from "../../../database/models/Comic.js";
import app from "../../index.js";
import { comicIdMock, comicsMock } from "../../../mocks/comicsMock.js";

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

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(tokenMock),
});

describe("Given a DELETE '/comics/:id' endpoint", () => {
  describe("When it receives a request with an id of a comic", () => {
    test("Then it should respond with status code 200 and the message 'Congratulations, the comic was deleted'", async () => {
      const idComicPath = `/comics/${comicIdMock}`;
      const expectedStatusCode = 200;
      const expectedMessage = "Congratulations, the comic was deleted";

      await User.create(userMock);
      await Comic.create(comicsMock);

      const response = await request(app)
        .delete(idComicPath)
        .set("Authorization", "Bearer Token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody).toHaveProperty("message", expectedMessage);
    });
  });
});
