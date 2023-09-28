import { type NextFunction, type Request, type Response } from "express";
import { createComicController } from "../comicsControllers.js";
import Comic from "../../../../database/models/Comic.js";
import { comicMock, comicsMock } from "../../../../mocks/comicsMock.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a createComicController controller", () => {
  const req: Partial<Request> = {
    body: comicsMock,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with 'Blankets' and a response", () => {
    Comic.create = jest.fn().mockReturnValue(comicMock);

    test("Then it should it should call the received response's method status with 201", async () => {
      const expectedStatusCode = 201;

      await createComicController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with comic 'Blankets'", async () => {
      const expectedComic = { comic: comicMock };

      await createComicController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedComic);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with code status 500 and error message 'The comic couldn't be created'", async () => {
      const expectedErrorMessage = new CustomError(
        "The comic couldn't be created",
        500,
        "The comic couldn't be created",
      );

      Comic.create = jest.fn().mockRejectedValue(expectedErrorMessage);

      await createComicController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
