import { MongoMemoryServer } from "mongodb-memory-server";
import admin from "firebase-admin";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import tokenMock from "../../../mocks/tokenMock.js";
import { comicIdMock, comicMockById } from "../../../mocks/comicsMock.js";
import userMock from "../../../mocks/userMock.js";
import User from "../../../database/models/User.js";
import Comic from "../../../database/models/Comic.js";
import app from "../../index.js";

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

describe("Given a POST '/comics/:id' endpoint", () => {
  describe("When it receives a request with an 'Maus' comic", () => {
    test("Then it should respond with status code 200 and the comic 'Maus'", async () => {
      const idComicPath = `/comics/${comicIdMock}`;
      const expectedStatusCode = 200;

      await User.create(userMock);
      await Comic.create(comicMockById);

      const response = await request(app)
        .get(idComicPath)
        .set("Authorization", "Bearer Token")
        .expect(expectedStatusCode);

      expect(response.body.comic).toHaveProperty("title", comicMockById.title);
    });
  });
});
