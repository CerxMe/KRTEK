import {read, save} from "./db.js";
import generateCover from "./generateCover.js";

export default async function(selection) {
    console.log('Reading file...')
    const data = read(selection)
    console.log('Reading details...')
    // get link
    const a = data.split('\n||||||\nVÝSTUP:\n||||||\n')
    const b = a[0].split('\n||||||\n')
    const c = b[0].split(' || ')
    const title = c[1].split('\n')[0]
    const offer = a[0].replace(b[0] + '\n||||||\n', '')

    // regenerate response
    console.log('Offer: '+ title)
    const cover = await generateCover(offer)
    save(`${c[0]} || ${c[1]}\n||||||\n${offer}\n\n||||||\nVÝSTUP:\n||||||\n${cover}`)
}