function removeQueryParams(url) {
    return `${url.split('?')[0]}`;
}

export default async function(page) {
    // Wait for the search results to load
    await (await page.waitForSelector('.SearchResultCard')).scrollIntoView();

    // Get an array of all the search result elements
    const searchResultElements = await page.$$('.SearchResultCard');
    const offers = []

    // Iterate over the search result elements
    for (const element of searchResultElements) {
        // Do something with each search result element
        // For example, log the job title
        const titleElement = await element.$('.SearchResultCard__titleLink');
        const title = (await page.evaluate(titleElement => titleElement?.textContent, titleElement)).trim();
        const link = removeQueryParams(await page.evaluate(titleElement => titleElement?.href, titleElement));
        // page.click(titleElement)
        offers.push({title, link})
        // open in new tab
        //await titleElement.click({button: 'middle'})
    }
    //await page.close()
    return offers
}