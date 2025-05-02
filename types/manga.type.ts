export interface Manga {
  name: String;
  description: String;
  coverImg: String;
  mangaId: String;
}
export type MangaList = Manga[];

export interface MangaDetails {
  name: String;
  description: String;
  coverImg: String;
  author: String[];
  genre: String[];
  chapList: {
    chapName: String;
    chapId: String;
  }[];
}
export type ChapterImages = String[];
