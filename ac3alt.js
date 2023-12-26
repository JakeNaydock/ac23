
const fs = require('fs');
const util = require('util'); const data = fs.readFileSync('input3.txt', 'utf8').split('\n');

let unAllowedCharacters = new Set();

const numbersRegex = /\d+/g;

function getYIndices(index, length) {
    let STRINGLENGTH = 140;
    let start = index;
    let end = index + length;
    start = start === 0 ? 0 : start - 1;
    end = end === STRINGLENGTH - 1 ? end : end + 1;
    return { start, end }
};

const hasSymbols = (str) =>
    Boolean(str?.split('')?.find((char) => isNaN(char) && char !== '.'));

let sumOfPartNumbers = data.reduce((acc, row, rowIndex) => {
    //iterate over matched numbers
    let numbers = row.matchAll(numbersRegex);
    for (const number of numbers) {
        let numValue = Number(number[0]);
        const { start, end } = getYIndices(number.index,
            number[0].length);
        //right index
        let forwardIdx = number.index === row.length - 1 ? undefined :
            number[0].length + number.index;
        //left index
        let prevIdx = number.index === 0 ? undefined : number.index - 1;
        //grab values
        let forward = data[rowIndex]?.[forwardIdx];
        let prev = data[rowIndex]?.[prevIdx];
        //Does left or right have symbols?
        let neighborsHaveSymbols = (hasSymbols(prev) ?? false) || (hasSymbols(forward) ?? false);
        let above = data[rowIndex - 1]?.slice(start, end);
        //bottom values
        let below = data[rowIndex + 1]?.slice(start, end);
        let topFloorHasSymbols = hasSymbols(above) ?? false;
        let bottomFloorHasSymbols = hasSymbols(below) ?? false;
        let isPartNumber = topFloorHasSymbols || bottomFloorHasSymbols || neighborsHaveSymbols;
        if (isPartNumber) acc += numValue;
    }

    return acc;
}, 0);

console.log(sumOfPartNumbers);