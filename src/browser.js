import puppeteer from "puppeteer";
const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 250
});
export async function openPage(link) {
    const page = (await browser.pages())[0] || await browser.newPage()
    await page.bringToFront()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36')
    await page.setViewport({width: 1280, height: 720})
    await page.goto(link);
    //await page.addScriptTag({path: 'src/inject.js'})
    return page
}