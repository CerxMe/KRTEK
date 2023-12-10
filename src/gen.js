import {conf} from "../conf.js";
import getOffers from "./searchResults.js"
import evaluateOffers from "./evaluateOffers.js";
import extractDetails from "./extractDetails.js"
import generateCover from "./generateCover.js";
import {save} from "./db.js"
import {readPage} from "./browser.js"
export default async function() {
    console.log('Reading latest offers...')
    const page = await readPage(conf.searchLink)
    const offers = await getOffers(page)

    console.log('Cherrypicking...')
    // TODO: "nothing new yet" / wait
    const cherrypick = await evaluateOffers(offers)
    console.log(cherrypick)

    console.log('Reading details...')
    const selection = offers.filter( (o,i) => new Set(cherrypick).has(i.toString()))
    console.log('Batch: ' + selection.length)
    for(const offer of selection) {
        console.log('Processing offer: ' + offer.title)
        await page.goto(offer.link)
        const details = await extractDetails(page)
        if (!!details) {
            const cover = await generateCover(details)
            save(`${offer.link} || ${offer.title}\n||||||\n${details}\n\n||||||\nVÝSTUP:\n||||||\n${cover}`)
        }
    }

    setTimeout(async ()=> {
        await page.close()
        console.log('Done. ~ run again tomorrow.')
    }, 10*1000)
}