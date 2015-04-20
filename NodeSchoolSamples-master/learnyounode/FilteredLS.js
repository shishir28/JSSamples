var fs = require('fs');


fs.readdir(process.argv[2], function(err, list){
var count = 0;  
for (idx in list){
  var filName = list[idx];  
  var ext = list[idx].substr(list[idx].lastIndexOf('.')+1);
  if(ext === process.argv[3]){
    console.log(list[idx]);
  }
}
});
