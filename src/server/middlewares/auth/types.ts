import { type Request } from "express";
import { type ComicStructure } from "../../../database/models/types.js";

export interface AuthRequest
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Partial<Omit<ComicStructure, "_id" | "user">>
  > {
  userId?: string;
}

export interface AuthRequestWithStringBody
  extends Request<Record<string, unknown>, Record<string, unknown>, string> {
  userId?: string;
}
