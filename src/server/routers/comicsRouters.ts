import express from "express";
import {
  createComicController,
  deleteComicByIdController,
  getComicByIdController,
  getComics,
  modifyComicByIdController,
} from "../controllers/comics/comicsControllers.js";
import paths from "../paths/paths.js";

const comicsRouter = express.Router();

comicsRouter.get(paths.root, getComics);
comicsRouter.delete(`${paths.root}:id`, deleteComicByIdController);
comicsRouter.post(`${paths.root}`, createComicController);
comicsRouter.get(`${paths.root}:id`, getComicByIdController);
comicsRouter.patch(`${paths.root}:id`, modifyComicByIdController);

export default comicsRouter;
