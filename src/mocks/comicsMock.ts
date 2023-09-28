import mongoose from "mongoose";
import { type ComicStructure } from "../database/models/types.js";

export const comicIdMock = new mongoose.Types.ObjectId().toString();
export const authIdmock = new mongoose.Types.ObjectId().toString();

export const comicsMock: ComicStructure[] = [
  {
    _id: comicIdMock,
    title: "Maus",
    image: "maus.png",
    synopsis:
      "Maus recounts the chilling experiences of the authors father during the Holocaust, with Jews drawn as wide-eyed mice and Nazis as menacing cats.",
    genre: "Memoir",
    numberPages: 159,
    coverType: "Hardcover",
    releaseDate: 1986,
    isRead: true,
    authorName: "Art Spiegelman",
    authorImage: "artspiegelman.png",
    authorNotableWork: "Maus",
    authorBiography:
      "Art Spiegelman (born Itzhak Avraham ben Zeev) is New-York-based comics artist, editor, and advocate for the medium of comics, best known for his Pulitzer Prize-winning comic memoir, Maus.",
    user: authIdmock,
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    title: "Persepolis",
    image: "persepolis.png",
    authorName: "Marjane Satrapi",
    synopsis:
      "A graphic memoir of a girl's coming-of-age during the Iranian Revolution.",
    genre: "Memoir",
    numberPages: 160,
    coverType: "Hardcover",
    releaseDate: 2000,
    authorImage: "marjanesatrapi.png",
    authorNotableWork: "Persepolis",
    authorBiography:
      "Iranian-born graphic novelist, known for 'Persepolis,' a memoir of her childhood.",
    isRead: false,
    user: new mongoose.Types.ObjectId().toString(),
  },
];

export const comicMock: Partial<ComicStructure> = {
  title: "Blankets",
  image: "image_url_here",
  synopsis:
    "A touching coming-of-age story that explores the complexities of family, faith, and first love.",
  genre: "Memoir",
  numberPages: 592,
  coverType: "Paperback",
  releaseDate: 2003,
  authorName: "Craig Thompson",
  authorImage: "author_image_url_here",
  authorNotableWork: "Goodbye, Chunky Rice",
  authorBiography:
    "Craig Thompson is an American graphic novelist known for his emotionally rich and introspective storytelling.",
  isRead: false,
};

export const comicMockById: ComicStructure = {
  _id: comicIdMock,
  title: "Maus",
  image: "maus.png",
  synopsis:
    "Maus recounts the chilling experiences of the authors father during the Holocaust, with Jews drawn as wide-eyed mice and Nazis as menacing cats.",
  genre: "Memoir",
  numberPages: 159,
  coverType: "Hardcover",
  releaseDate: 1986,
  isRead: true,
  authorName: "Art Spiegelman",
  authorImage: "artspiegelman.png",
  authorNotableWork: "Maus",
  authorBiography:
    "Art Spiegelman (born Itzhak Avraham ben Zeev) is New-York-based comics artist, editor, and advocate for the medium of comics, best known for his Pulitzer Prize-winning comic memoir, Maus.",
  user: authIdmock,
};

export const comicMockByIdModified: ComicStructure = {
  _id: comicIdMock,
  title: "Maus",
  image: "maus.png",
  synopsis:
    "Maus recounts the chilling experiences of the authors father during the Holocaust, with Jews drawn as wide-eyed mice and Nazis as menacing cats.",
  genre: "Memoir",
  numberPages: 159,
  coverType: "Hardcover",
  releaseDate: 1986,
  isRead: false,
  authorName: "Art Spiegelman",
  authorImage: "artspiegelman.png",
  authorNotableWork: "Maus",
  authorBiography:
    "Art Spiegelman (born Itzhak Avraham ben Zeev) is New-York-based comics artist, editor, and advocate for the medium of comics, best known for his Pulitzer Prize-winning comic memoir, Maus.",
  user: authIdmock,
};
