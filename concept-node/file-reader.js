
const fs = require('fs');
const path = require('path');

const fileName = 'report-1582627860241'

const filePath = path.resolve(__dirname,fileName)
fs.readFile( filePath , (err, data) => console.log('Job Done !', data.toString()))