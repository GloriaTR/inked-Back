import { type NextFunction, type Response } from "express";
import Comic from "../../../database/models/Comic.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  type CustomAuthRequest,
  type AuthRequest,
  type AuthRequestWithStringBody,
} from "../../middlewares/auth/types.js";

export const getComics = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, filter } = req.query;
    const limitComics = Number(limit);

    const _id = req.userId;

    let comicsQuery = Comic.find({ user: _id }).sort({ _id: -1 });

    if (filter && (filter === "✔ Read" || filter === "Not Read")) {
      const isRead = filter === "✔ Read";
      comicsQuery = comicsQuery.where("isRead").equals(isRead);
    }

    const comics = await comicsQuery.limit(limitComics).exec();

    const totalComics = await Comic.where({ user: _id }).countDocuments();

    res.status(200).json({ comics, totalComics });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve the comics",
    );

    next(customError);
  }
};

export const deleteComicByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await Comic.findByIdAndDelete(id).exec();

    res.status(200).json({ message: "Congratulations, the comic was deleted" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "The comic couldn't be deleted",
    );

    next(customError);
  }
};

export const createComicController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comic = req.body;
    const { userId } = req;

    const newComic = await Comic.create({ ...comic, user: userId });

    res.status(201).json({ comic: newComic });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "The comic couldn't be created",
    );

    next(customError);
  }
};

export const getComicByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const comic = await Comic.findById(id).exec();

    res.status(200).json({ comic });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Can't retrieve the comic",
    );
    next(customError);
  }
};

export const modifyComicByIdController = async (
  req: AuthRequestWithStringBody,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const isRead = req.body === "true";

    const modifiedComic = await Comic.findByIdAndUpdate(
      id,
      {
        isRead: !isRead,
      },
      {
        returnDocument: "after",
      },
    ).exec();

    res.status(200).json({ comic: modifiedComic });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      304,
      "The comic couldn't be modified",
    );
    next(customError);
  }
};
