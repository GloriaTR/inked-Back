import { type NextFunction, type Response } from "express";
import auth from "./auth.js";
import { type AuthRequest } from "./types.js";
import admin from "firebase-admin";
import mongoose from "mongoose";
import { type UserStructure } from "../../../database/models/types.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

jest.mock("firebase-admin");

beforeEach(() => {
  jest.clearAllMocks();
});

const token = {
  uid: "BearerToken",
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

const user: UserStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  authId: token.uid,
  name: "Juana",
};

describe("Given an auth middleware", () => {
  describe("When it receives a request with a valid token ", () => {
    test("Then it should call the next function received", async () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearertoken"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request without token", () => {
    test("Then it should call the next function with error message 'No token provider' ", async () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

      const expectedError = new CustomError(
        "No token provider",
        401,
        "Unauthorized",
      );

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an invalid token", () => {
    test("Then it should call the next function with error message 'Invalid token'", async () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearertoken"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(token),
      });

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

      const error = new Error();

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error as CustomError);
    });
  });

  describe("When it receives a request and the id of the user is not found", () => {
    test("Then it should call the next function with error message 'User id not found'", async () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue("Bearertoken"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const expectedError = new CustomError(
        "User id not found",
        404,
        "User id not found",
      );

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
