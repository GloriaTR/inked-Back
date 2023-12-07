import { type Request, type Response } from "express";
import { type NextFunction } from "express-serve-static-core";
import Comic from "../../../../database/models/Comic.js";
import CustomError from "../../../../CustomError/CustomError.js";
import { getComics } from "../comicsControllers.js";
import { comicsMock } from "../../../../mocks/comicsMock.js";
import { type AuthRequest } from "../../../middlewares/auth/types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  query: { limit: "10" },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getComics controller", () => {
  describe("When it receives a response", () => {
    Comic.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(comicsMock),
    });

    Comic.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(comicsMock.length),
      }),
    });

    test("Then it should call its method status with code 200", async () => {
      const expectedStatusCode = 200;

      await getComics(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Maus' and 'Persepolis'", async () => {
      await getComics(req as AuthRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        comics: comicsMock,
        totalComics: comicsMock.length,
      });
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 404 status code and the message 'Can't retrieve the comics'", async () => {
      const expectedError = new CustomError(
        "Can't retrieve the comics",
        404,
        "Can't retrieve the comics",
      );

      Comic.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getComics(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
