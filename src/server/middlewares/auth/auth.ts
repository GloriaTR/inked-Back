import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import CustomError from "../../../CustomError/CustomError.js";
import firebaseApp from "../../../firebase.js";
import User from "../../../database/models/User.js";
import { type AuthRequest } from "./types.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("No token provider", 401, "Unauthorized");
      next(error);

      return;
    }

    const { uid, displayName } = await admin
      .auth(firebaseApp)
      .verifyIdToken(token);

    let user = await User.findOne({ authId: uid }).exec();

    if (!user) {
      user = new User({
        name: displayName as string,
        authId: uid,
      });

      await user.save();
    }

    req.userId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token",
    );

    next(customError);
  }
};

export default auth;
