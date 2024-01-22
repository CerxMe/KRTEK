import fs from "fs";
import {conf} from "../conf.js";
import apiCall from "./apiCall.js";
const systemMessage = fs.readFileSync( 'src/prompts/prompt_v2.md', 'utf8');

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

        // prompts
        const messages = [
            { role: "system", content: systemMessage },
            { role: "user", content: `ŽIVOTOPIS UCHAZEČE:\n${conf.cv} ` },
            { role: "user", content: `PRACOVNÍ NADÍDKY:${list}\n` },
            { role: "assistant", content: `[` },
        ]
        const response = `[`+(await apiCall(messages)).toString()
        console.log('Got: ' + response)

        // I'm just being incredibly stupid and gave up at coming up with anything better for now:

        const enforceResponseFormat = /^\[(\d|,?|\s?)*\]/ // strict [<num>, <num>]
        const valid = enforceResponseFormat.test(response)
        let pattern = /\d+/gm;
        if ( valid ) {
            // parse
            pattern = /(\d+)[ ,]?/gm
            const selection = []

            let m
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
        } else { // backup just numbers
            let m
            while ((m = pattern.exec(response)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === pattern.lastIndex) {
                    pattern.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                    selection.push(match)
                });
            }
            return selection
        }
    } while (retries < 6)


    console.log('Evaluation Failed!')
}