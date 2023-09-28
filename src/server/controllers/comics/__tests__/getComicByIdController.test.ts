import CustomError from "../../../../CustomError/CustomError";
import Comic from "../../../../database/models/Comic";
import { comicIdMock, comicMockById } from "../../../../mocks/comicsMock";
import { getComicByIdController } from "../comicsControllers";
import { type NextFunction, type Request, type Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Pick<Request, "params"> = {
  params: {
    id: comicIdMock,
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getComicByIdController controller", () => {
  describe("When it receives a request with an existing comic id, a response and a next function", () => {
    test("Then it should call its method status with code 200", async () => {
      const expectedStatusCode = 200;

      Comic.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(comicMockById) });

      await getComicByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the comic 'Maus'", async () => {
      await getComicByIdController(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ comic: comicMockById });
    });
  });

  describe("when it receives a next function and there is an error", () => {
    test("Then it should call the received next function with code status 500 and error message 'Can't retrieve the comic'", async () => {
      const expectedErrorMessage = new CustomError(
        "Can't retrieve the comic",
        500,
        "Can't retrieve the comic",
      );

      Comic.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedErrorMessage),
      });

      await getComicByIdController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
