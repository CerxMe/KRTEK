# KRTEK
Script pro automatické filtrování pracovních nabídek a generaci personalizovaného motivačního dopisu v Češtině s ChatGPT.
Využívá speciální [instrukce](src/prompt) pro modifikaci chování chatbota.

### Použití:
1. Upravte konfigurační soubor `conf.js`
2. Nahrajte strukturovaný životopis, zpracujte kritéria jako prostý textový dokument `cv.txt` a uložte v hlavním adresáři
3. Nainstalujte [Node.js](https://nodejs.org/en/download/) *(zkoušeno na v18)* a požadované balíčky příkazem `npm install`

Samotný **postup** je poté rozdělen:
- přečtu nejnovější nabídky
- vyberu nejlepší
- zobrazím podrobnosti
- vygeneruji odpověďi

`npm run krtek gen` -> uloží výstup do adresáře `/data`

- (*manuální kontrola*) - zpracuj odpověď

Generace jsou očíslované, obsahují původní text nabídky včetně odkazu.
- upravím výstup, uložím změny
- vyplním formulář a odešlu

`npm run krtek send <číslo>` měl by vám dorazit potvrzovací e-mail.