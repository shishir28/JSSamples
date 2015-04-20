var fs = require('fs');

fs.readFile(process.argv[2], function(err, data){
var str = data.toString();
var arrayOfLines = str.split('\n');
console.log(arrayOfLines.length -1);  
});
