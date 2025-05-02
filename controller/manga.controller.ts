import axios from "axios";
import * as cheerio from "cheerio";
import { Response, Request } from "express";
import puppeteer from "puppeteer";
import { Manga, MangaDetails, MangaList } from "../types/manga.type.js";
import {
  parseChapterImages,
  parseMangaDetails,
  parseMangaList,
} from "../helper/mangaParser.js";
import { scrollPageToLoadImages } from "../helper/autoScroller.js";

export const getMangaList = async (req: Request, res: Response) => {
  const url = "https://mangakatana.com/";
  //   const mangaList: MangaList = [];
  try {
    const response = await axios(url);
    const mangaList: MangaList = parseMangaList(response.data);
    res.status(200).json({ success: true, data: mangaList });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }

  console.log("awaiter");
};
export const getMangaDetails = async (req: Request, res: Response) => {
  const { mangaId } = req.params;

  if (!mangaId) {
    res
      .status(400)
      .json({ success: false, message: "Missing mangaId parameter" });
  }

  try {
    const response = await axios(`https://mangakatana.com/manga/${mangaId}`);
    const mangaDetails = parseMangaDetails(response.data);
    res.status(200).json({ success: true, data: mangaDetails });
  } catch (error) {
    console.error("Error fetching manga details", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch manga details" });
  }
};
export const getChapterImages = async (req: Request, res: Response) => {
  const { mangaId } = req.params;
  const { chapter } = req.params;
  console.log(req.params);

  if (!mangaId) {
    res
      .status(400)
      .json({ success: false, message: "Missing mangaId parameter" });
  } else if (!chapter) {
    res
      .status(400)
      .json({ success: false, message: "Missing chapter parameter" });
  }

  try {
    const response = await axios(
      `https://mangakatana.com/manga/${mangaId}/${chapter}`
    );
    const url = `https://mangakatana.com/manga/${mangaId}/${chapter}`;
    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();

    // await page.goto(`https://mangakatana.com/manga/${mangaId}/${chapter}`, {
    //   waitUntil: "networkidle2",
    // });

    // // Scroll to bottom to trigger lazy loading
    // await scrollPageToLoadImages(page);

    // const images = await page.$$eval("div.wrap_img > img", (imgElements) =>
    //   imgElements.map((img) => {
    //     // Check for data-src or data-lazy-src attributes
    //     const dataSrc =
    //       img.getAttribute("data-src") || img.getAttribute("data-lazy-src");
    //     return dataSrc || img.src;
    //   })
    // );

    // console.log(images);

    // await browser.close();
    const chapterImages = await parseChapterImages(url);
    res.status(200).json({ success: true, data: chapterImages });
  } catch (error) {
    console.error("Error fetching manga details", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch manga details" });
  }
};

// export const getMangaDetails = async (req: Request, res: Response) => {
//   const { mangaId } = req.params;
//   console.log(mangaId);
//   //   console.log(req.h);
//   const url = `https://mangakatana.com/manga/${mangaId}`;
//   try {
//     await axios(url).then((response) => {
//       const html_data = response.data;
//       const $ = cheerio.load(html_data);
//       // console.log(html_data);
//       // console.log($);
//       const key = {
//         image: ".cover > img:nth-child(1)",
//         name: "h1.heading",
//         genre: "a.text_0",
//         author: ".author",
//         description: ".summary > p:nth-child(2)",
//       };
//       // const imageKey = ".cover > img:nth-child(1)";
//       // const nameKey = "h1.heading";
//       // const genreKey = "a.text_0";
//       // const authorKey = ".author";
//       // const descriptionKey = ".summary > p:nth-child(2)";
//       const coverImg = $(key.image).text();
//       const name = $(key.name).text();
//       const description = $(key.description).text();
//       const genreList: String[] = [];
//       const authorList: String[] = [];

//       $(key.genre)
//         .map(function (i, el) {
//           genreList.push($(this).text());
//           return $(this).text();
//         })
//         .toArray()
//         .join(" ");
//       $(key.author)
//         .map(function (i, el) {
//           authorList.push($(this).text());
//           return $(this).text();
//         })
//         .toArray()
//         .join(" ");

//       console.log(authorList);
//       console.log(name);
//       console.log(description);
//       const mangaDetails: MangaDetails = {
//         name: name,
//         description: description,
//         coverImg: coverImg,
//         author: authorList,
//         genre: genreList,
//         // chapList: []
//       };

//       // console.log($(imageKey).attr);
//       res.status(200).json({ success: true, data: mangaDetails });
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error });
//   }
//   // console.log(man);

//   console.log("awaiter");
// };
