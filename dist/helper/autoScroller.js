var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function scrollPageToLoadImages(page_1) {
    return __awaiter(this, arguments, void 0, function* (page, scrollIncrement = 2000, delay = 500) {
        const scrollHeight = yield page.evaluate(() => document.body.scrollHeight);
        for (let i = 0; i < scrollHeight; i += scrollIncrement) {
            yield page.evaluate((scrollY) => {
                window.scrollTo(0, scrollY);
            }, i);
            // Introduce a delay to allow images to load
            yield page.evaluate((delayTime) => {
                return new Promise((resolve) => setTimeout(resolve, delayTime));
            }, delay);
        }
    });
}
//# sourceMappingURL=autoScroller.js.map