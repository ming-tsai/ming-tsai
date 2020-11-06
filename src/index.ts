import { scrapeUsers } from './scraper/user-scraper';
import { writeToFile, parseToHtml } from './utils'

scrapeUsers().then((result) => {
    const html = parseToHtml(result);
    writeToFile(html);
}).catch((error) => {
    console.log(error);
});