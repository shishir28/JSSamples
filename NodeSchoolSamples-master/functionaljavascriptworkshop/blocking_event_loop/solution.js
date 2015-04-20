function repeat(operation, num) {
    var count = 0;
    return function newRepeat(operation, num) {
        if (num <= 0) {
            return;
        }
        operation();
        count++;
        if (count % 100 === 0) {
            setTimeout(function() {
                newRepeat(operation, num - 1);
            });
        } else {
            newRepeat(operation, num - 1);
        }
    };
}
module.exports = repeat;