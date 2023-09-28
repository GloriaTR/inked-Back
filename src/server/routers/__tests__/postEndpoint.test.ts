import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import tokenMock from "../../../mocks/tokenMock.js";
import userMock from "../../../mocks/userMock.js";
import User from "../../../database/models/User.js";
import { comicMock, comicsMock } from "../../../mocks/comicsMock.js";
import app from "../../index.js";
import Comic from "../../../database/models/Comic.js";
import paths from "../../paths/paths.js";
import { type ComicStructure } from "../../../database/models/types.js";

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

User.findOne = jest
  .fn()
  .mockReturnValue({ exec: jest.fn().mockResolvedValue(userMock) });

describe("Given a POST '/comics/' endpoint", () => {
  describe("When it receives a request with comic 'Blankets'", () => {
    test("Then it should it should respond with status code 201 and the comic 'Blankets'", async () => {
      const expectedNewComic = comicMock;
      const expectedStatusCode = 201;
      const path = paths.comics;

      await User.create(userMock);
      await Comic.create(comicsMock);

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer Token")
        .send(expectedNewComic as Omit<ComicStructure, "id">)
        .expect(expectedStatusCode);

      expect(response.body.comic).toHaveProperty(
        "title",
        expectedNewComic.title,
      );
    });
  });
});
