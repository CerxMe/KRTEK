import {read} from "./db.js"
import {openPage} from "./browser.js"
import submitForm from "./submitForm.js";

export default async function(selection) {
    console.log('Reading file...')
    const data = read(selection)
    console.log('Reading details...')
    // get link
    const a = data.split('\n\n||||||\nVÝSTUP:\n||||||\n')
    const cover = a[1]
    const b = a[0].split('\n||||||\n')
    const c = b[0].split(' || ')
    const offerLink = c[0]
    const title = c[1].split('\n')[0]

    console.log('Offer: '+ title)
    const link = offerLink.replace('/rpd/', '/jof/')
    const page = await openPage(link)

    await submitForm(page, cover)

    setTimeout(async ()=> {
        await page.close()
        console.log('Sent!')
    }, 60*1000)
}