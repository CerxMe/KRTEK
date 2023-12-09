import fs from "fs";

export const conf = {
    // OpenAI API klíč -> https://platform.openai.com/account/api-keys
    apiKey: 'sk-TEtYV3sLXPYDEpUb3ALpT3BldkFJW6SOSCAb1s1ywW3ivVl7',
    // URL s parametery filtru
    searchLink: 'https://beta.www.jobs.cz/prace/praha/?date=24h&locality%5Bradius%5D=10',
    // Údaje do formuláře
    name: 'Tomáš',
    surname: 'Jedna',
    email: 't1@seznam.cz',
    phone: '+420 601101111',
    // Umístění životopisu - název souboru v hlavním adresáři
    cv: fs.readFileSync( 'cv.txt', 'utf8'), // Kritéria pro generaci
    attachment: 'cv.pdf', // Originální životopis, přiloží se k odpovědi
}
