import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
// tslint:disable-next-line: no-duplicate-imports
import { RuntimeOptions } from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    // functions で query parameter を使う例
    switch (request.query.lang) {
        case 'ja':
            response.send("こんにちは");
            break;
        case 'en':
            response.send("Hello");
            break;
        case 'zh':
            response.send("你好");
            break;
        case 'kr':
            response.send("안녕하세요");
            break;
        default:
            response.send("Hello");
            break;
    }
});

const runtimeOpts:RuntimeOptions = {
    timeoutSeconds: 300,
    memory: '1GB'
}

exports.scraping = functions.runWith(runtimeOpts).https.onRequest(async (request, response) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const url = request.query.url;
            if(typeof url === 'string'){
                const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
                const page = await browser.newPage();
                await page.goto(url, {waitUntil: ['load', 'networkidle2'], timeout: 0});

                const pageTitle = await page.title();

                await browser.close();
                
                return response.status(200).json({ status: "finished", url: url, title: pageTitle });
            }else{
                return response.status(400).send('request.query.url is not string')
            }
        } catch (error) {
            console.error(error);
            return response.status(500).send(error)
        }
    });
});