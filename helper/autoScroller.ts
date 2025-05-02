import puppeteer from "puppeteer";
export async function scrollPageToLoadImages(
  page: puppeteer.Page,
  scrollIncrement: number = 2000,
  delay: number = 500
) {
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

  for (let i = 0; i < scrollHeight; i += scrollIncrement) {
    await page.evaluate((scrollY) => {
      window.scrollTo(0, scrollY);
    }, i);

    // Introduce a delay to allow images to load
    await page.evaluate((delayTime) => {
      return new Promise((resolve) => setTimeout(resolve, delayTime));
    }, delay);
  }
}
