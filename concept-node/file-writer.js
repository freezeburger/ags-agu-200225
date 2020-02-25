const fs = require('fs');
const path = require('path');
const os = require('os');

const fileName = 'report-' + Date.now()
const data = 'Hello Words !' + os.EOL;

const filePath = path.resolve(__dirname,fileName)
fs.writeFile( filePath ,data, err => console.log('Job Done !'))