function doubleAll(numbers) {
    return numbers.map(doubleTheNumber);
}

function doubleTheNumber(number) {
    return number * 2;
}
module.exports = doubleAll;