import mongoose from "mongoose";
import { type UserStructure } from "../database/models/types";
import tokenMock from "./tokenMock";

const userMock: UserStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  name: "Juana",
  authId: tokenMock.uid,
};

export default userMock;
