const fs = require('fs');

// const book = {
//     title: 'Who Am I?',
//     author: 'John Doe'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('playground/book-json.json', bookJSON);

const dataBuffer = fs.readFileSync('playground/book-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.title = 'Where I amd from?';
data.author = 'Jane Doe';

const newBookJSON = JSON.stringify(data);
fs.writeFileSync('playground/book-json.json', newBookJSON);
