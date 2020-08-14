import { User } from '../models/User';

const fileName = 'README.md';
const start_comment = '<!--awesome-profiles:start-->';
const end_comment = '<!--awesome-profiles:end-->';
const pattern = new RegExp(`${start_comment}[\\s\\S]*${end_comment}`, 'gm');

export const writeToFile = (html: string) => {
    var fs = require('fs')
    fs.readFile(fileName, 'utf8', function (err: any, data: any) {
        if (err) {
            return console.log(err);
        }
        const replacement = `${start_comment}\n${html}\n${end_comment}`;
        var result = data.replace(pattern, replacement);

        fs.writeFile(fileName, result, 'utf8', function (err: any) {
            if (err) return console.log(err);
        });
    });
};

export const parseToHtml = (users: Array<User>) => {
    let result = '';
    users.forEach((u) => {
        result += 
`<a href="${u.url}">
    <img src="${u.avatarUrl}" alt="${u.name}" width="60px" height="60px">
</a>
`
    });
    return result;
};
