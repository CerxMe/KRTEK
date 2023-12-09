import fs from "fs";
import {conf} from "../conf.js";
import apiCall from "./apiCall.js";
const systemMessage = fs.readFileSync( 'src/prompt/prompt_v2.txt', 'utf8');

export default async function (offers) {
    // transform the set into a newline-separated list
    let list = ''
    let i = 0
    for(const o of offers){
        i++
        list += '\n'+ i +'. '+ o.title
    }

    //console.log(list + '\n')

    let retries = 0
    let lastres = null
    do {
        retries++

        // prompt
        const messages = [
            { role: "system", content: systemMessage },
            { role: "user", content: `ŽIVOTOPIS UCHAZEČE:\n${conf.cv} ` },
            { role: "user", content: `PRACOVNÍ NADÍDKY:${list}\n[` },
        ]
        const response = (await apiCall(messages)).toString()
        const enforceResponseFormat = /^\[(\d|,?|\s?)*\]/
        const valid = enforceResponseFormat.test(response)
        if ( valid ) {
            // parse
            const pattern = /(\d+)[ ,]?/g
            let m;
            const selection = []

            while ((m = pattern.exec(response)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === pattern.lastIndex) {
                    pattern.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    // console.log(`Found match, group ${groupIndex}: ${match}`);
                    if(groupIndex === 1) {
                        selection.push(match)
                    }
                });
            }
            return selection
        }
        lastres = response
    } while (retries < 6)
    console.log('Evaluation Failed!')
    return lastres
}