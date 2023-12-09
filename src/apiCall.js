// Your API key
const apiKey = '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';

import {Configuration, OpenAIApi} from 'openai';
import fs from 'fs';

const configuration = new Configuration({
    apiKey
})

const openai = new OpenAIApi(configuration);

// const messages = [
//     { role: "system", content: 'test' },
//     { role: "user", content: `confirm ok` },
// ]

export default async function (messages){
    const chatGPT = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
    })

    const reply = chatGPT.data.choices[0].message.content
    return reply
}