function duckCount() {
    var result = Array.prototype.slice.call(arguments, 0).filter(function (arg) {
        return Object.prototype.hasOwnProperty.call(arg, 'quack')
    });
    return result.length;
}

module.exports = duckCount;