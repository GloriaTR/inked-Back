import { Schema, model } from "mongoose";

const comicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  numberPages: {
    type: Number,
    required: true,
  },
  coverType: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Number,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  authorNotableWork: {
    type: String,
    required: true,
  },
  authorBiography: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comic = model("Comic", comicSchema, "comics");

export default Comic;
