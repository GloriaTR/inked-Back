import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import admin from "firebase-admin";
import Comic from "../../../database/models/Comic.js";
import app from "../../index.js";
import { type ComicStructure } from "../../../database/models/types.js";
import User from "../../../database/models/User.js";
import userMock from "../../../mocks/userMock.js";
import tokenMock from "../../../mocks/tokenMock.js";
import { comicsMock } from "../../../mocks/comicsMock.js";

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

describe("Given an endpoint GET '/comics'", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and comics 'Maus' and 'Persepolis'", async () => {
      const expectedStatusCode = 200;
      const comicsPath = "/comics";

      await User.create(userMock);
      await Comic.create(comicsMock);

      const response = await request(app)
        .get(comicsPath)
        .set("Authorization", "Bearer Token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { comics: ComicStructure[] };

      responseBody.comics.forEach((comic: ComicStructure, comicPosition) => {
        expect(comic).toHaveProperty("title", comicsMock[comicPosition].title);
      });
    });
  });
});
