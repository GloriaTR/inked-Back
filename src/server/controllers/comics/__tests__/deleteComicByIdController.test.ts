import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import Comic from "../../../../database/models/Comic.js";
import { deleteComicByIdController } from "../comicsControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  params: {
    id: new mongoose.Types.ObjectId().toString(),
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a deleteComicByIdController controller", () => {
  describe("When it receives a request with a comic id, a response and a next function", () => {
    test("Then it should call its method status with code 200", async () => {
      const expectedStatusCode = 200;

      Comic.findByIdAndDelete = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await deleteComicByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("And the message 'Congratulations, the comic was deleted'", async () => {
      const expectedMessage = "Congratulations, the comic was deleted";

      await deleteComicByIdController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("when it receives a next function and there is an error", () => {
    test("Then it should call the received next function with code status 500 and error message 'The comic couldn't be deleted'", async () => {
      const expectedErrorMessage = new CustomError(
        "The comic couldn't be deleted",
        500,
        "The comic couldn't be deleted",
      );

      Comic.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedErrorMessage),
      });

      await deleteComicByIdController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
