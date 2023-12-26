/*
The engine schematic (your puzzle input) consists of a visual representation of the engine.
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

What is the sum of all of the part numbers in the engine schematic?

*/

const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('i3test.txt', 'utf-8');

const numberTest = (arg) => {
    if (!arg) return console.log(`${arg} is not a number and cannot be parsed`);
    return arg.match(/\d/g) ? true : false;
};

//const isNumber = char => /[0-9]/.test(char);

const symbols = ['*', '%', '$', '@', '&', '+', '/', '#'];

const isSymbol = (arg) => symbols.includes(arg);
console.log(isSymbol(null));

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const isNumber = (arg) => numbers.includes(arg);

const isPeriod = (arg) => {
    if (!arg) return false;
    return arg.match(/\./g) ? true : false;
};



const isSymbolOld = (arg) => {
    if (!arg) return false;
    return !isNumber(arg) && !isPeriod(arg) ? true : false;
};


//Symbols are: * % $ @ & + / #
let lines = data.split('\n');

let partNumbers = [];
let sum = 0;

for (let line = 0; line < lines.length; line++) {
    let curLine = lines[line];
    let partCache = '';
    for (let i = 0; i < curLine.length; i++) {
        let currentChar = lines[line][i];
        //if (line === lines.length - 1) break;
        let twoBack = (i < 2) ? null : lines[line][i - 2];
        let previousChar = (i === 0) ? null : (lines[line][i - 1]);
        let nextChar = (i === lines[line].length - 1) ? null : (lines[line][i + 1]);
        let lastLineChar = (line === 0) ? null : lines[line - 1][i];
        let nextLineChar = (line === lines.length - 1) ? null : lines[line + 1][i];
        let lastDiagLeft = (line === 0) ? null : lines[line - 1][i - 1];
        let lastDiagRight = (line === 0) ? null : lines[line - 1][i + 1];
        let nextDiagLeft = (line === lines.length - 1) ? null : lines[line + 1][i - 1];
        let nextDiagRight = (line === lines.length - 1) ? null : lines[line + 1][i + 1];

        console.log(`Current char line ${line} index ${i}: ${currentChar}. NOT is num cur char? ${!isNumber(currentChar)}`);

        //console.log(typeof (currentChar));
        //console.log(`Is num cur char? ${isNumber(currentChar)}`);
        //console.log(`Next line char: ${nextLineChar}`);
        //console.log(`Next line diag left: ${nextDiagLeft}`);
        //console.log(`Next line diag right ${nextDiagRight}`);
        //console.log('Part cache: ' + partCache);
        //New approach: keep adding the number to the cache if it meets the condition.
        //If a char does NOT meet the condition, push the current cache into the numbers list
        if (isNumber(currentChar) && (isSymbol(previousChar) || isSymbol(nextChar) || isSymbol(lastLineChar) || isSymbol(nextLineChar) ||
            isSymbol(lastDiagLeft) || isSymbol(lastDiagRight) || isSymbol(nextDiagLeft) || isSymbol(nextDiagRight))) {
            console.log(`Adding ${currentChar} from index ${i} to part cache. Is number? ${isNumber(currentChar)}`);
            //console.log('Previous char is number? ' + isNumber(previousChar));

            //If we have no parts in the cache currently, check if there are more digits before to add on (not attached to symbol)
            if (!partCache) {
                //Check back YET ANOTHER character (if it's 3 digits and only one on end matches)
                //console.log('Two back: ' + twoBack);
                //console.log('Two back is num?: ' + isNumber(twoBack));

                if (isNumber(previousChar)) {
                    if (isNumber(twoBack)) {
                        partCache += twoBack + previousChar + currentChar;
                    } else {
                        partCache += previousChar + currentChar;
                    }
                } else {
                    partCache += currentChar;
                }
            } else {
                partCache += currentChar
            }
            console.log(`PART CACHE AFTER ADDING ${partCache}`);


            //If there are parts in the cache, and current car is number - add it on to complete the number
        } else if (isNumber(currentChar) && partCache != '') {
            partCache += currentChar;
        } else if (!isNumber(currentChar) && partCache != '') {
            //Push what's currently in the cache into the numbers array - then clear the current cache.
            console.log(`Pushing part cache: ${partCache}`)
            partNumbers.push(partCache);
            sum += partCache * 1;
            partCache = '';
        }
    }
}

console.log(partNumbers);
console.log(`Sum: ${sum}`);
let sum2 = 0;
partNumbers.forEach((num) => sum2 += num * 1);
console.log(`Sum 2: ${sum2}`);


