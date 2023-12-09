// Your API key
import {conf} from 'conf.js'
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: conf.apiKey
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