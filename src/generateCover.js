import fs from "fs";
import {conf} from "../conf.js";
import apiCall from "./apiCall.js";
const systemMessage = fs.readFileSync( 'src/prompt/prompt.txt', 'utf8');

export default async function (details) {
    // prompt
    const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: `ŽIVOTOPIS UCHAZEČE:\n${conf.cv} ` },
        { role: "user", content: `PRACOVNÍ NADÍDKA:\n${details}` },
    ]
    const response = await apiCall(messages)
    return response
}