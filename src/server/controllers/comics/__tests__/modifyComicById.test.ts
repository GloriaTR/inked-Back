import { type NextFunction, type Request, type Response } from "express";
import {
  comicIdMock,
  comicMockById,
  comicMockByIdModified,
} from "../../../../mocks/comicsMock.js";
import Comic from "../../../../database/models/Comic.js";
import { modifyComicByIdController } from "../comicsControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  body: comicMockById,
  params: {
    id: comicIdMock,
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a modifyComicByIdController controller", () => {
  describe("When it receives a request with an id 'comicIdMock' and comic 'Maus', a response and a next function", () => {
    test("Then it should call its method status with code 200", async () => {
      const expectedStatusCode = 200;

      Comic.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(comicMockByIdModified),
      });

      await modifyComicByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with comic 'Maus'", async () => {
      const expectedComic = { comic: comicMockByIdModified };

      await modifyComicByIdController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedComic);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 304 status code and the message 'The comic couldn't be modified'", async () => {
      const expectedError = new CustomError(
        "The comic couldn't be modified",
        304,
        "The comic couldn't be modified",
      );

      Comic.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(expectedError) });

      await modifyComicByIdController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
