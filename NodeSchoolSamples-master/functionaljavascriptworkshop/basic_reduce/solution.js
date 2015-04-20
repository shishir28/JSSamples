function countWords(inputWords) {
    return inputWords.reduce(function (result, a) {
        if (result.hasOwnProperty(a)) {
            result[a] = Number(result[a]) + 1;
        } else {
            result[a] = 1;
        }
        return result;
    }, {});
}
module.exports = countWords;