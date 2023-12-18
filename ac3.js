/*
The engine schematic (your puzzle input) consists of a visual representation of the engine.
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

What is the sum of all of the part numbers in the engine schematic?

*/

const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('./i3test.txt', 'utf-8');

const isNumber = (arg) => arg.match(/\d/g) ? true : false;
const isPeriod = (arg) => arg.match(/\./g) ? true : false;
const isSymbol = (arg) => !isNumber(arg) && !isPeriod(arg) ? true : false;

let arrNumIndex = [];
let arrSymIndex = [];
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

for (const match of numMatches) {
    console.log(`symbol matched: ${match[0]}. Index: ${match.index}`);
    arrSymIndex.push(match.index);
}
//console.log(arrNumIndex);




for (let line = 0; line < lines.length; line++) {
    //let curLine = Array.from(lines[line]);
    //let nextLine = Array.from(lines[line + 1]);

    for (var i = 0; i < lines[line].length; i++) {
        let char = lines[line][i];
        if (isNumber(char)) arrNumIndex.push(i);
        if (isSymbol(char)) arrSymIndex.push(i);
    }

}



