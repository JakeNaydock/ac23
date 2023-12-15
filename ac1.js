let fs = require('fs');
const data = fs.readFileSync('./input1.txt', 'utf-8');
//console.log(data);
let lineArr = data.split('\n');
let arrNums = [];
for (let i = 0; i < lineArr.length; i++) {
    let str = lineArr[i];
    //console.log(str);
    let re = /\d/;
    let firstNumber = str.match(re)[0];
    //console.log(firstNumber);

    let reBack = /\d(?!.*\d)/
    let lastNumber = str.match(reBack)[0];
    //console.log(lastNumber);
    let lineNumber = firstNumber + lastNumber;
    //console.log(lineNumber);
    //converts to number0
    lineNumber = lineNumber * 1;
    arrNums.push(lineNumber)
}
let total = 0;
arrNums.forEach((num) => {
    total += num
});

console.log('Grand total part 1: ' + total); //Part 1 answer: 54953

//start part 2
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
//checkNumbers(numberMap);
let testLine = lineArr[32];
console.log(testLine);

function checkNumbers(objNumbers, str, regFor, regBack) {
    //Find the part one numbers ( string digits)
    let firstNumber = str.match(regFor)[0];
    let lastNumber = str.match(regBack)[0];
    let firstNumIndex = str.indexOf(firstNumber);
    let lastNumIndex = str.indexOf(lastNumber);
    console.log('Index of first digit num: ' + firstNumIndex);
    console.log('Index of last digit num: ' + lastNumIndex);
    let firstNum = {
        number: firstNumber,
        index: firstNumIndex
    }
    let lastNum = {
        number: lastNumber,
        index: lastNumIndex
    }

    console.log(`BEFORE LOOP - First number:${JSON.stringify(firstNum)}. Last Number: ${JSON.stringify(lastNum)}`);
    console.log('first num number: ' + firstNum.number);
    for (let num in objNumbers) {
        //console.log('In obj numbers loop...');
        //console.log('Number: ' + num);
        if (str.includes(num)) {
            //console.log('Number found: ' + num);
            let numIndex = str.indexOf(num);
            //console.log('Index of current found number: ' + numIndex)
            let currentFirstIndex = firstNum.index;
            let currentLastIndex = lastNum.index;
            //console.log('First Index: ' + currentFirstIndex);
            //console.log('Last Index: ' + currentLastIndex);

            //Don't use NOT operator,in case index of first number is 0
            if (numIndex < currentFirstIndex) {
                firstNum.number = num;
                firstNum.index = numIndex;
            }
            if (numIndex > currentLastIndex) {
                lastNum.number = num;
                lastNum.index = numIndex;
            }
        }
        return {
            firstNum: firstNum * 1,
            lastNum: lastNum * 1
        }

    }
    return console.log(`First number:${JSON.stringify(firstNum)}. Last Number: ${JSON.stringify(lastNum)}`)
}

let re = /\d/;
let reBack = /\d(?!.*\d)/
checkNumbers(numberMap, testLine, re, reBack);



