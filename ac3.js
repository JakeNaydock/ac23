/*
The engine schematic (your puzzle input) consists of a visual representation of the engine.
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

What is the sum of all of the part numbers in the engine schematic?

*/

const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('./i3test.txt', 'utf-8');

const isNumber = (arg) => {
    if (!arg) return console.log(`${arg} is not a number and cannot be parsed`);
    return arg.match(/\d/g) ? true : false;
};

const isPeriod = (arg) => {
    if (!arg) return false;
    return arg.match(/\./g) ? true : false;
};
const isSymbol = (arg) => {
    if (!arg) return false;
    return !isNumber(arg) && !isPeriod(arg) ? true : false;
};


function uniqueFilter(value, index, array) {
    return array.indexOf(value) === index;
}
let symbols = [];
//list of special characters
for (let x of data) {
    for (let y of x) {
        if (isNaN(y) && y != "." && !symbols.includes(y)) {
            symbols.push(y);
        }
    }
}
console.log('Symbols: ' + symbols);

//Symbols are: * % $ @ & + /
let lines = data.split('\n');
let testLine = lines[2];
console.log(testLine);
//Captures numbers, and indexes of those numbers per line
const numMatches = testLine.matchAll(/\d{1,}/g);
const symbolMatches = testLine.matchAll(/^(\d).*$/g);
console.log(JSON.stringify(numMatches.match));
/*
for (const match of numMatches) {
    console.log(`symbol matched: ${match[0]}. Index: ${match.index}`);
    arrSymIndex.push(match.index);
}
//console.log(arrNumIndex);
*/
let partNumbers = [];

for (let line = 0; line < lines.length; line++) {
    //let curLine = Array.from(lines[line]);
    //let nextLine = Array.from(lines[line + 1]);
    //const numMatches = [...lines[line].matchAll(/\d{1,}/g)];
    //console.log(`Num matches for line ${line}: ${numMatches[0]}`);
    let curLine = lines[line];

    for (let i = 0; i < curLine.length; i++) {
        console.log(`Line lines.length ${curLine.length}`);
        let currentChar = lines[line][i];
        if (line === lines.length - 1) break;
        let nextLineChar = lines[line + 1][i];
        let nextDiagLeft = lines[line + 1][i - 1];
        let nextDiagRight = lines[line + 1][i + 1];

        console.log(`Current char line ${line} index ${i}: ${currentChar}. Is num cur char? ${isNumber(currentChar)}`);
        //console.log(typeof (currentChar));
        //console.log(`Is num cur char? ${isNumber(currentChar)}`);
        console.log(`Next line char: ${nextLineChar}`);
        console.log(`Next line diag left: ${nextDiagLeft}`);
        console.log(`Next line diag right ${nextDiagRight}`);
        let previousChar = (i === 0) ? null : (lines[line][i - 1]);
        let nextChar = (i === lines[line].length - 1) ? null : (lines[line][i + 1]);
        if (isNumber(currentChar) && (isSymbol(nextLineChar)) || isSymbol(nextDiagLeft) || isSymbol(nextDiagRight)) {
            let partCache = '';
            if (isNumber(previousChar)) {
                partCache += previousChar;
            }
            if (isNumber(currentChar)) {
                partCache += currentChar
            }

            if (isNumber(nextChar)) {
                partCache += nextChar
            }

            let mostRecentNum = partNumbers.slice(-1)[0];

            if (partCache != mostRecentNum) {
                partNumbers.push(partCache);
            }
        }
    }
}

console.log(partNumbers);

let testVar = lines[0];
/*
for (let j = 0; j < testVar.length; j++) {
    console.log(testVar[j])
}
*/


