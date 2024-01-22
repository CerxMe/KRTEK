import TurndownService from "turndown"
const turndownService = new TurndownService()

function removeQueryParams(url) {
    return `${url.split('?')[0]}`;
}

// Metadata for internal crawler
export const details = {
    searchLink: 'https://beta.www.jobs.cz/prace/praha/?date=24h&locality%5Bradius%5D=10',
    // searchLink: 'https://beta.www.jobs.cz/prace/praha/?locality%5Bcode%5D=M217377&locality%5Blabel%5D=Říčany%2C%20okres%20Praha-východ&locality%5Bcoords%5D=49.99167%2C14.65426&locality%5Bradius%5D=10&date=24h',
}

// Reads the links and titles.
export async function searchResults(page) {
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

// Reads the offer content
export async function extractSubstance(page) {

    try { // Standard listing
        const content = await page.waitForSelector('.RichContent');
        await content.scrollIntoView()

        // Parse text
        const textz = await content.evaluate((t) => {
            return t.innerHTML
        })
        const markdown = turndownService.turndown(textz)

        return markdown
    } catch (e) { // Customized page
        // TODO: screenshot + ocr fallback??
        console.log('cannot parse', page.url())
        return null
    }
}