/*
The engine schematic (your puzzle input) consists of a visual representation of the engine.
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

What is the sum of all of the part numbers in the engine schematic?

*/

const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('./input3.txt', 'utf-8');

const isNumber = (arg) => arg.match(/\d/g) ? true : false;
const isPeriod = (arg) => arg.match(/\./g) ? true : false;
const isSymbol = (arg) => !isNumber(arg) && !isPeriod(arg) ? true : false;

let arrNumIndex = [];
let arrSymIndex = [];
function uniqueFilter(value, index, array) {
    return array.indexOf(value) === index;
}
let symbols = [];

let lines = data.split('\n');
let testLine = lines[2];
console.log(testLine);
const numMatches = testLine.matchAll(/\d{1,}/g);
for (const match of numMatches) {
    //console.log(`Number matched: ${match[0]}. Index: ${match.index}`);
    arrNumIndex.push(match.index);
}
console.log(arrNumIndex);
for (let line = 0; line < lines.length; line++) {
    let arrLine = Array.from(lines[line]);
    arrLine.forEach((char, i) => {
        if (!isNumber(char) && !isPeriod(char)) symbols.push(lines[line])
    });

}
let uniquesymbols = symbols.filter(uniqueFilter);
console.log('Unique symbols: ' + uniquesymbols);


/*
let arrLine = Array.from(testLine);
console.log(arrLine);
console.log('Arrline length ' + arrLine.length);
console.log('Line length: ' + testLine.length);
console.log(isNumber('.'));
let testLineEl = arrLine[7];
console.log(testLineEl);
console.log('Is period? ' + isPeriod(testLineEl));
console.log('Is number? ' + isNumber(testLineEl));
console.log('Is symbol? ' + isSymbol(testLineEl));
 
*/



let sum = 0;

/*
for (let line = 1; line < lines.length; line++) {
    let curLine = Array.from(lines[line]);
    let nextLine = Array.from(lines[line + 1]);

    curLine.forEach((char, i) => {
        if (isNumber(char)) arrNumIndex.push(i);
        if (isSymbol(char)) arrSymIndex.push(i);
    })

    console.log(arrLine)
}
*/
