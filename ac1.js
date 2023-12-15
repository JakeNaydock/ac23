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
checkNumbers(numberMap);

function checkNumbers(objNumbers, str, re) {
    for (let num in objNumbers) {
        console.log(num);
        console.log(objNumbers[num]);
    }

}



