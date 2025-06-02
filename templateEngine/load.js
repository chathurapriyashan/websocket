const fs = require('fs');

module.exports = function load(filePath){
    const file = fs.readFileSync(filePath);
    return file;
}