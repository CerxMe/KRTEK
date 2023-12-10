import {conf} from "../conf.js";
export default async function (page, cover) {
    // Wait for the form to load
    await (await page.waitForSelector('#jobad_application_firstName')).scrollIntoView();

    // fill form
    await page.locator('#jobad_application_firstName').fill(conf.name)
    await page.locator('#jobad_application_surname').fill(conf.surname)
    await page.locator('#jobad_application_email').fill(conf.email)
    await page.locator('#jobad_application_phone').fill(conf.phone)

    // input generated cover
    await (await page.waitForSelector('#jobad_application_coverLetter')).scrollIntoView();
    await page.locator('#jobad_application_coverLetter').fill(cover)

    // attach cv
    await (await page.waitForSelector('#customCvs')).scrollIntoView();
    const fileInput = await page.$('#customCvs')
    await fileInput.uploadFile('cv.pdf')

    // submit the form
    await (await page.waitForSelector('body > div.Container.Container--cassiopeia.mb-1200 > div > form > div.d-grid.d-tablet-block.mt-900.text-center > button')).scrollIntoView();
    // const submit = await page.waitForSelector('Footer ')
    //submit.click()
    // console.log(submit)
}

