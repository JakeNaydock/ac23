/*
The engine schematic (your puzzle input) consists of a visual representation of the engine.
There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

What is the sum of all of the part numbers in the engine schematic?
*/
const { match } = require('assert');
const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('i3test.txt', 'utf-8');

const numberTest = (arg) => {
    if (!arg) return console.log(`${arg} is not a number and cannot be parsed`);
    return arg.match(/\d/g) ? true : false;
};

const symbols = ['*', '%', '$', '@', '&', '+', '/', '#'];
const isSymbol = (arg) => symbols.includes(arg);


const isAst = arg => arg === '*';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const isNumber = (arg) => numbers.includes(arg);

let allMatches = [];


//Symbols are: * % $ @ & + / #
let lines = data.split('\n');
let partNumbers = [];
let sum = 0;

for (let line = 0; line < lines.length; line++) {
    let curLine = lines[line];
    let partCache = '';
    for (let i = 0; i < curLine.length; i++) {
        let currentChar = lines[line][i];
        let twoBack = (i < 2) ? null : lines[line][i - 2];
        let previousChar = (i === 0) ? null : (lines[line][i - 1]);
        let nextChar = (i === lines[line].length - 1) ? null : (lines[line][i + 1]);
        let lastLineChar = (line === 0) ? null : lines[line - 1][i];
        let nextLineChar = (line === lines.length - 1) ? null : lines[line + 1][i];
        let lastDiagLeft = (line === 0) ? null : lines[line - 1][i - 1];
        let lastDiagRight = (line === 0) ? null : lines[line - 1][i + 1];
        let nextDiagLeft = (line === lines.length - 1) ? null : lines[line + 1][i - 1];
        let nextDiagRight = (line === lines.length - 1) ? null : lines[line + 1][i + 1];


        let exactlyTwoMatches = false;
        let matchCache = [];
        let positions = [previousChar, nextChar, lastLineChar, nextLineChar, lastDiagLeft, lastDiagRight, nextDiagLeft, nextDiagRight];


        if (isAst(currentChar)) {
            positions.forEach((pos) => {
                if (isNumber(pos)) {
                    matchCache.push({
                        val: pos.toString(),
                        lineNumber: line,
                        charInd: i
                    });
                }
            });
            //If we have exactly two matches, check the numbers around the matched one to make sure we get everything.
            if (matchCache.length === 2) {
                //console.log(`Current match cache: ${JSON.stringify(matchCache)}`);
                allMatches.push(matchCache);
                //matchCache.forEach((match) => allMatches.push(match));
            }
        }
    }
}

let matchLog = '';
allMatches.forEach((match) => matchLog += `\n${(JSON.stringify(match))}`);
console.log(`All matches: ${matchLog}`);


let finalArray = [];
let finalSum = 0;

for (let j = 0; j < allMatches.length; j++) {
    let partCache = '';
    let match = allMatches[j];
    console.log(`Match ${JSON.stringify(match)}`);
    let match1 = match[0];
    let match2 = match[1];
    console.log(`Full num index ${j} match 1: ${compileFullNumber(match1)}`);


    //I need to find the numbers around the first matched number, then the second one.

    /*
    let currentChar = lines[match.lineNumber][match.charInd];
    //console.log(`Current char in loop ${currentChar}`);
    let twoBack = lines[match.lineNumber][match.charInd - 2];
    let previousChar = lines[match.lineNumber][match.charInd - 1];
    let nextChar = lines[match.lineNumber][match.charInd + 1];
    let twoAhead = lines[match.lineNumber][match.charInd + 2];
    console.log(`Two back in loop ${twoBack}`);

    let sequence = []

    if (isNumber(twoBack)) {
        partCache += twoBack
    } else if (isNumber()) {

    }
*/
}

function compileFullNumber(matchObj) {
    let lineNo = matchObj.lineNumber;
    let ind = matchObj.charInd;
    let curLine = lines[lineNo];

    /*
        let positionsToCheck = [twoBack, prevChar, currentChar, nextChar, twoAhead];
        positionsToCheck.forEach((pos) => { if (isNumber(pos)) sequence += pos });
    
       
        //console.log(`Line no in function ${lineNo}`);
        
        let currentChar = lines[lineNo][ind];
        //console.log(`Current char in loop ${currentChar}`);
        let threeBack = lines[lineNo][ind - 3];
        let twoBack = lines[lineNo][ind - 2];
        let prevChar = lines[lineNo][ind - 1];
        let nextChar = lines[lineNo][ind + 1];
        let twoAhead = lines[lineNo][ind + 2];
    */

    let sequence = '';
    for (let k = -3; k < 4; k++) {
        //console.log(`k in loop: ${k}`);
        console.log(`Index: ${ind}`);
        console.log(`Index plus k: ${ind + k}`)
        let char = curLine[ind + k];
        //console.log(`Char in loop:${char}`);
        if (isNumber(char)) sequence += char;
    }

    return sequence * 1;
}

//console.log(partNumbers);
//console.log(`Sum: ${sum}`);

