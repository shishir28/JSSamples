module.exports = function arrayMap(arr, fn) {
    var result = [];
    if (arr.length > 0) {
        result.push(fn(arr[0]));
    }
    arr.reduce(function (previousValue, currentValue, index, array) {
        result.push(fn(array[index]));
    });
    return result;
};