export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface ComicStructure {
  _id: string;
  title: string;
  image: string;
  synopsis: string;
  genre: string;
  numberPages: number;
  coverType: string;
  releaseDate: number;
  isRead: boolean;
  authorName: string;
  authorImage: string;
  authorNotableWork: string;
  authorBiography: string;
  user: string;
  __v?: number;
}
