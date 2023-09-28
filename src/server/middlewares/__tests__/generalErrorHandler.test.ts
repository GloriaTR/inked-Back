import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalErrorHandler } from "../errors.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalErrorHandler middleware", () => {
  describe("When it receives a response and an error with status code 404 and message 'Comics not found'", () => {
    const errorMessage = new CustomError(
      "Comics not found",
      404,
      "Comics not found",
    );

    test("Then it should call its status method with code 404", () => {
      const expectedStatusCode = 404;

      generalErrorHandler(errorMessage, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method with error message 'Comics not found'", () => {
      const expectedMessage = { error: "Comics not found" };

      generalErrorHandler(errorMessage, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  const error = new Error();

  describe("When it receives a response and an error with no status code and no message", () => {
    test("Then it should call the received response status method with code 500", () => {
      const expectedStatus = 500;

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response json method with the error message 'Internal server error'", () => {
      const expectedMessage = { error: "Internal server error" };

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
