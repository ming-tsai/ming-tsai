import { scrapeUsers, Users } from './scraper/user-scraper';
import { writeToFile, parseToHtml } from './utils'

scrapeUsers().then(() => {
    const html = parseToHtml(Users);
    writeToFile(html);
}).catch((error) => {
    console.log(error);
});