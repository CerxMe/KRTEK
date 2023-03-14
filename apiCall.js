// Your API key
const apiKey = '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';

import {Configuration, OpenAIApi} from 'openai';
import fs from 'fs';

const configuration = new Configuration({
    apiKey
})

const openai = new OpenAIApi(configuration);


const systemMessage = fs.readFileSync('./prompt.txt', 'utf8');
const jobOffer = fs.readFileSync('./jobOffer.txt', 'utf8');
const cv = fs.readFileSync('./cv.txt', 'utf8');


const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: `PRACOVNÍ NADÍDKA:\n${jobOffer}` },
    { role: "user", content: `ŽIVOTOPIS UCHAZEČE:\n${cv} ` }
]

const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
})

const message = chatGPT.data.choices[0].message.content
fs.writeFileSync('coverLetter.txt', message)
console.log(message)