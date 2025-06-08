import * as cheerio from "cheerio";
import {
  ChapterImages,
  Manga,
  MangaDetails,
  MangaList,
} from "../types/manga.type.js";
import puppeteer from "puppeteer";
import { scrollPageToLoadImages } from "./autoScroller.js";
export const parseMangaDetails = (html_data: any) => {
  //  const html_data = response.data;
  const $ = cheerio.load(html_data);
  const key = {
    image: ".cover > img:nth-child(1)",
    name: "h1.heading",
    genre: "a.text_0",
    author: ".author",
    description: ".summary > p:nth-child(2)",
    chapter: ".uk-table > tbody > tr > td > div > a",
  };
  // const imageKey = ".cover > img:nth-child(1)";
  // const nameKey = "h1.heading";
  // const genreKey = "a.text_0";
  // const authorKey = ".author";
  // const descriptionKey = ".summary > p:nth-child(2)";
  const coverImg = $(key.image).attr("src");
  const name = $(key.name).text();
  const description = $(key.description).text();
  const genreList: String[] = [];
  const authorList: String[] = [];
  const chapList: {
    chapName: String;
    chapId: String;
  }[] = [];

  $(key.genre)
    .map(function (i, el) {
      genreList.push($(this).text());
      return $(this).text();
    })
    .toArray()
    .join(" ");
  $(key.author)
    .map(function (i, el) {
      authorList.push($(this).text());
      return $(this).text();
    })
    .toArray()
    .join(" ");
  $(key.author)
    .map(function (i, el) {
      authorList.push($(this).text());
      return $(this).text();
    })
    .toArray()
    .join(" ");
  $(key.chapter)
    .map(function (i, el) {
      chapList.push({
        chapName: $(this).text(),
        chapId: $(this).attr("href")?.split("/").pop() || "",
      });
      return $(this).text();
    })
    .toArray()
    .join(" ");

  const mangaDetails: MangaDetails = {
    name: name,
    description: description,
    coverImg: coverImg || "",
    author: authorList,
    genre: genreList,
    chapList: chapList,
  };
  return mangaDetails;
};

export const parseMangaList = (html_data: any) => {
  const $ = cheerio.load(html_data);
  const key = {
    image: "#book_list > div > div > div > a > img",
    name: "#book_list > div > div > h3 > a",
    mangaId: "#book_list > div > div > h3 > a",
    description: "#book_list > div > div > div.summary",
  };
  const mangaList: MangaList = [];
  $(key.name).each((index, element) => {
    const coverImg = $(key.image).attr("src");
    const name = $(key.name).text();
    const description = $(key.description).text();
    const mangaId = $(key.mangaId).attr("href");
    const manga: Manga = {
      name: name || "",
      coverImg: coverImg || "",
      description: description || "",
      mangaId: mangaId?.replace("https://mangakatana.com/manga/", "") || "",
    };

    mangaList.push(manga);
  });
  return mangaList;
};

export const parseChapterImages = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  // Scroll to bottom to trigger lazy loading
  await scrollPageToLoadImages(page);

  const images = await page.$$eval("div.wrap_img > img", (imgElements) =>
    imgElements.map((img) => {
      // Check for data-src or data-lazy-src attributes
      const dataSrc =
        img.getAttribute("data-src") || img.getAttribute("data-lazy-src");
      return dataSrc || img.src;
    })
  );

  console.log(images);

  await browser.close();
  //
  return images;
};

// await axios(url).then((response) => {
//       const html_data = response.data;
//       const $ = cheerio.load(html_data);
//       //
//       //
//       const imageKey = "#book_list > div > div > div > a > img";
//       const nameKey = "#book_list > div > div > h3 > a";
//       const mangaIdKey = "#book_list > div > div > h3 > a";
//       const descriptionKey = "#book_list > div > div > div.summary";
//       $(imageKey).each((index, element) => {
//         const coverImg = $(imageKey).attr("src");
//         const name = $(nameKey).text();
//         const description = $(descriptionKey).text();
//         const mangaId = $(mangaIdKey).attr("href");
//         //
//         const manga: Manga = {
//           name: name || "",
//           coverImg: coverImg || "",
//           description: description || "",
//           mangaId: mangaId?.replace("https://mangakatana.com/manga/", "") || "",
//         };
//         if (coverImg && name && description && mangaId) {
//           mangaList.push(manga);
//         }
//         //
//       });
//
//       //
//     });
