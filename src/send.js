import {conf} from "../conf.js";

import {read} from "./db.js"
import {openPage} from "./browser.js"


export default async function(selection) {
    console.log('Reading file...')
    const data = read(selection)
    console.log(data)
    console.log('Reading details...')
    // get link
    const a = data.split('\n\n||||||\nVÝSTUP:\n||||||\n')
    const cover = a[1]
    const b = a[0].split('\n\n||||||\n')
    const c = b[0].split(' || ')
    console.log('Offer: '+ c[1])
    const link = c[0]

    const page = await openPage(link)

    setTimeout(async ()=> {
        await  page.close()
        console.log('Done. Run me again tomorrow.')
    }, 60*1000)
}