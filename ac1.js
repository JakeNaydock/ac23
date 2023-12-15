const fs = require('fs');
const data = fs.readFileSync('./input1.txt', 'utf-8');
const numberMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

const part1 = 'Part 1';
const part2 = 'Part 2';
const lineArr = data.split('\n');
const reg = /\d/;
const reBack = /\d(?!.*\d)/
let partOneTotal = 0;
let partTwoTotal = 0;

for (let i = 0; i < lineArr.length; i++) {
    let lineString = lineArr[i];
    let partOneLineResult = checkNumbers(numberMap, lineString, reg, reBack, part1);
    let partTwoLineResult = checkNumbers(numberMap, lineString, reg, reBack, part2);
    partOneTotal += partOneLineResult;
    partTwoTotal += partTwoLineResult;
}
console.log('Part 1 total: ' + partOneTotal);
console.log('Part 2 total: ' + partTwoTotal);

function checkNumbers(objNumbers, str, regFor, regBack, part) {

    let firstNumMatch = str.match(regFor);
    let firstNumber = (firstNumMatch) ? firstNumMatch[0] : null;

    let lastNumMatch = str.match(regBack);
    let lastNumber = (lastNumMatch) ? lastNumMatch[0] : null;

    let firstNumIndex = (firstNumMatch) ? str.indexOf(firstNumber) : null;
    let lastNumIndex = (lastNumMatch) ? str.lastIndexOf(lastNumber) : null;

    let firstNum = {
        number: firstNumber,
        index: firstNumIndex
    }
    let lastNum = {
        number: lastNumber,
        index: lastNumIndex
    }

    if (part === 'Part 1') {
        let lineNumber = firstNum.number + lastNum.number
        return lineNumber * 1;
    }

    for (let num in objNumbers) {
        if (str.includes(num)) {

            let lineFirstNumIndex = str.indexOf(num);
            let lineLastNumIndex = str.lastIndexOf(num);

            let currentFirstIndex = firstNum.index;
            let currentLastIndex = lastNum.index;

            if (currentFirstIndex === null || currentFirstIndex === -1 || lineFirstNumIndex < currentFirstIndex) {
                firstNum.number = objNumbers[num];
                firstNum.index = lineFirstNumIndex;
            }
            if (currentLastIndex === null || currentLastIndex === -1 || lineLastNumIndex > currentLastIndex) {
                lastNum.number = objNumbers[num];
                lastNum.index = lineLastNumIndex;
            }
        }
    }
    let lineNumber = firstNum.number + lastNum.number;
    return lineNumber * 1;
}