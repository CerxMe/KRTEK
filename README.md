# KRTEK
Tohle je velmi jednoduchý node.js script pro generování personalizovaného motivačního dopisu v Češtině přes novou ChatGPT API.
Využívá speciální systémový [prompt](prompt.txt) pro modifikaci chování chatbota.

---
### Prerekvizity:
- [Node.js 19](https://nodejs.org/en/download/current/)
- Upravte konstantu apiKey v souboru `apiCall.js` na [váš OpenAI API klíč](https://platform.openai.com/account/api-keys)
- Nainstalujte knihovny příkazem `npm install`
---
### Použití:
Všechny data jsou uloženy v prostém textovém souboru pro jednoduché zpracování. Můžete použít speciální znaky nebo třeba Markdown pro strukturování životopisu.
1. Uložte váš životopis do souboru `cv.txt`
2. Zkopírujte text pracovního inzerátu do souboru `jobOffer.txt`
3. Spusťe skript `node apiCall.js` a vyčkejte na dokončení operace 

Text odpovědi se propíše do souboru `coverLetter.txt`

---
*Doporučuji před odesláním odpověď nejprve přečíst a zkontrolovat!*
