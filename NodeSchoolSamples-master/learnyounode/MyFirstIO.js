var fs = require('fs');

var buf =  fs.readFileSync(process.argv[2]);
var str = buf.toString();
var arrayOfLines = str.split('\n');
console.log(arrayOfLines.length -1);