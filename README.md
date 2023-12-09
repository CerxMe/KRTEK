# KRTEK
Script pro automatické filtrování pracovních nabídek a generaci personalizovaného motivačního dopisu v Češtině s ChatGPT.
Využívá speciální [instrukce](src/prompt) pro modifikaci chování chatbota.

### Použití:
1. Upravte konfigurační soubor `conf.js`
2. Strukturovaný životopis zpracujte jako prostý textový dokument a uložte `cv.txt` v hlavním adresáři.
3. Nainstalujte [Node.js](https://nodejs.org/en/download/) a požadované balíčky příkazem `npm install`.

Samotný postup je poté rozdělen do několika stádií:
- přečtu nejnovější nabídky, vyberu nejlepší
- dále zobrazím podrobnosti a vygeneruji odpověďi
- (*manuální kontrola*) - následně vyplním formulář a odešlu

