let fs = require('fs');
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
//console.log(data);
let part1 = 'Part 1';
let part2 = 'Part 2';
let lineArr = data.split('\n');
let re = /\d/;
let reBack = /\d(?!.*\d)/
let partOneTotal = 0;
let partTwoTotal = 0;
/*
let testArr = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen'
];
*/
//'1atwoneighta1'
let testArr = ['1atwoneighta1'];

for (let i = 0; i < lineArr.length; i++) {
    console.log('Current string: ' + lineArr[i]);
    let lineString = lineArr[i];
    let partOneLineResult = checkNumbers(numberMap, lineString, re, reBack, part1);
    let partTwoLineResult = checkNumbers(numberMap, lineString, re, reBack, part2);
    partOneTotal += partOneLineResult;
    partTwoTotal += partTwoLineResult;
}
console.log('Part 1 total: ' + partOneTotal);
console.log('Part 2 total: ' + partTwoTotal);

/*
let testStr = 'eightwothree';
let testNum = 'eight';
if (testStr.includes(testNum)) {
    console.log('test string includes testnum')
} else {
    console.log('test string does NOT include testnum')
}
*/
/*
let testLine = 'zoneight234';
let testLine2 = '7pqrstsixteen'
console.log(testLine);
let lineResult = checkNumbers(numberMap, testLine, re, reBack);
console.log(lineResult);
let lineResult2 = checkNumbers(numberMap, testLine2, re, reBack);
console.log(lineResult2);
let testSum = lineResult + lineResult2;
console.log(testSum);
*/


//start part 2

//checkNumbers(numberMap);

function checkNumbers(objNumbers, str, regFor, regBack, part) {
    //Find the part one numbers ( string digits)
    console.log('str regFor: ' + str.match(regFor));
    let firstNumMatch = str.match(regFor);
    let firstNumber = (firstNumMatch) ? firstNumMatch[0] : null;
    let lastNumMatch = str.match(regBack);
    //let lastNumMatch = regBack.exec(str);
    let lastNumber = (lastNumMatch) ? lastNumMatch[0] : null;
    console.log(`First number p1: ${firstNumber} .Last number p1: ${lastNumber}`)
    let firstNumIndex = (firstNumMatch) ? str.indexOf(firstNumber) : null;
    let lastNumIndex = (lastNumMatch) ? str.lastIndexOf(lastNumber) : null;
    console.log('Index of first digit num: ' + firstNumIndex);
    console.log('Index of last digit num: ' + lastNumIndex);
    //build initial object with part 1 number
    let firstNum = {
        number: firstNumber,
        index: firstNumIndex
    }
    let lastNum = {
        number: lastNumber,
        index: lastNumIndex
    }

    //Return here if user is doing part 1
    if (part === 'Part 1') {
        let lineNumber = firstNum.number + lastNum.number
        return lineNumber * 1;
    }

    console.log(`BEFORE LOOP - First number:${JSON.stringify(firstNum)}. Last Number: ${JSON.stringify(lastNum)}`);
    //console.log('first num number: ' + firstNum.number);
    for (let num in objNumbers) {
        //console.log('In obj numbers loop...');
        //console.log('Number: ' + num);
        if (str.includes(num)) {
            //console.log('Number found: ' + num);
            let lineFirstNumIndex = str.indexOf(num);
            let lineLastNumIndex = str.lastIndexOf(num);
            //console.log('Index of current found number: ' + numIndex)
            let currentFirstIndex = firstNum.index;
            let currentLastIndex = lastNum.index;
            //console.log('First Index: ' + currentFirstIndex);
            //console.log('Last Index: ' + currentLastIndex);

            //Don't use NOT operator,in case index of first number is 0
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
    console.log(`String: ${str}. First Num: ${firstNum.number}. Last Num: ${lastNum.number}`);
    let lineNumber = firstNum.number + lastNum.number;
    //console.log('Line number (string): ' + lineNumber)
    return lineNumber * 1;
}






