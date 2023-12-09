import TurndownService from "turndown"
const turndownService = new TurndownService()

export default async function (page) {
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
        console.log('cannot parse')
        return null
    }
}