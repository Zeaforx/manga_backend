var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { scrollPageToLoadImages } from "./autoScroller.js";
export const parseMangaDetails = (html_data) => {
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
    const genreList = [];
    const authorList = [];
    const chapList = [];
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
        var _a;
        chapList.push({
            chapName: $(this).text(),
            chapId: ((_a = $(this).attr("href")) === null || _a === void 0 ? void 0 : _a.split("/").pop()) || "",
        });
        return $(this).text();
    })
        .toArray()
        .join(" ");
    const mangaDetails = {
        name: name,
        description: description,
        coverImg: coverImg || "",
        author: authorList,
        genre: genreList,
        chapList: chapList,
    };
    return mangaDetails;
};
export const parseMangaList = (html_data) => {
    const $ = cheerio.load(html_data);
    const key = {
        image: "#book_list > div > div > div > a > img",
        name: "#book_list > div > div > h3 > a",
        mangaId: "#book_list > div > div > h3 > a",
        description: "#book_list > div > div > div.summary",
    };
    const mangaList = [];
    $(key.name).each((index, element) => {
        const coverImgElement = $(key.image).toArray()[index];
        const coverImg = coverImgElement ? $(coverImgElement).attr("src") : "";
        // const coverImg = $(key.image).attr("src");
        const nameElement = $(key.name).toArray()[index];
        const name = nameElement ? $(nameElement).text() : "";
        const descriptionElement = $(key.description).toArray()[index];
        const description = descriptionElement ? $(descriptionElement).text() : "";
        const mangaIdElement = $(key.mangaId).toArray()[index];
        const mangaId = mangaIdElement ? $(mangaIdElement).attr("href") : "";
        const manga = {
            name: name || "",
            coverImg: coverImg || "",
            description: description || "",
            mangaId: (mangaId === null || mangaId === void 0 ? void 0 : mangaId.replace("https://mangakatana.com/manga/", "")) || "",
        };
        console.log(manga);
        mangaList.push(manga);
    });
    return mangaList;
};
export const parseChapterImages = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
    });
    const page = yield browser.newPage();
    yield page.goto(url, {
        waitUntil: "networkidle2",
    });
    // Scroll to bottom to trigger lazy loading
    yield scrollPageToLoadImages(page);
    const images = yield page.$$eval("div.wrap_img > img", (imgElements) => imgElements.map((img) => {
        // Check for data-src or data-lazy-src attributes
        const dataSrc = img.getAttribute("data-src") || img.getAttribute("data-lazy-src");
        return dataSrc || img.src;
    }));
    console.log(images);
    yield browser.close();
    //
    return images;
});
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
//# sourceMappingURL=mangaParser.js.map