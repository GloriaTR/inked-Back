import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/ping/pingController.js";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import paths from "./paths/paths.js";
import comicsRouter from "./routers/comicsRouters.js";
import auth from "./middlewares/auth/auth.js";

const corsOptions = {
  origin: [process.env.ORIGIN_LOCAL!, process.env.ORIGIN_PROD!],
};

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json(), express.text());

app.use(cors(corsOptions));

app.get(paths.root, pingController);

app.use(paths.comics, auth, comicsRouter);

app.use(endpointNotFound);

app.use(generalErrorHandler);

export default app;
