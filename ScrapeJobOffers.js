import puppeteer from 'puppeteer'

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = 'https://beta.www.jobs.cz/prace/praha/?locality%5Bcode%5D=M217377&locality%5Blabel%5D=Říčany%2C%20okres%20Praha-východ&locality%5Bcoords%5D=49.99167%2C14.65426&locality%5Bradius%5D=10&date=24h';
    await page.goto(url);

    // Wait for the search results to load
    await page.waitForSelector('.SearchResultCard');

    // Get an array of all the search result elements
    const searchResultElements = await page.$$('.SearchResultCard');

    // Iterate over the search result elements
    for (const element of searchResultElements) {
        // Do something with each search result element
        // For example, log the job title
        const titleElement = await element.$('.SearchResultCard__titleLink');
        const title = await page.evaluate(titleElement => titleElement?.textContent, titleElement);
        const link = await page.evaluate(titleElement => titleElement?.href, titleElement);
        page.click(titleElement)
        console.log(`${title} - ${link}`);
    }

    await browser.close();
})();