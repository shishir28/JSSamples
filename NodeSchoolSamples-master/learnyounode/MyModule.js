var mymodule = require('./MyModuleFilter.js');
mymodule(process.argv[2], process.argv[3], function (err, data) {
    if (err) {
      console.log(err);
    } else {
        for (idx in data) {
            console.log(data[idx]);
        }
    }

});