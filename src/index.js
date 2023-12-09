import puppeteer, {defaultArgs} from "puppeteer";
import {conf} from "../conf.js";
import getOffers from "./searchResults.js"
import evaluateOffers from "./evaluateOffers.js";
import extractDetails from "./extractDetails.js"
import generateCover from "./generateCover.js";

const browser = await puppeteer.launch({
   // headless: false,
   // slowMo: 250
});

async function openPage(link) {
    const page = (await browser.pages())[0] || await browser.newPage()
    await page.bringToFront()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36')
    await page.setViewport({width: 1280, height: 720})
    await page.goto(link);
    //await page.addScriptTag({path: 'src/inject.js'})
    return page
}

console.log('Reading offers...')
const page = await openPage(conf.searchLink)
const offers = await getOffers(page)

console.log('Cherrypicking...')
const cherrypick = new Set(await evaluateOffers(offers))
console.log('Selected: ' + cherrypick)

const selection = offers.filter( (o,i) => cherrypick.has(i.toString()))
for(const offer of selection){
    console.log('Genearting...' + offer.title)
    await page.goto(offer.link)
    const details = await extractDetails(page)
    console.log(details)
    if(!!details){
        const cover = await generateCover(details)
        console.log(cover)
    }
}

// TODO: SEND THE REPLY


// 1 min timeout
setTimeout(async ()=> {
    await browser.close();
},60*1000)

