/*
The Elf would first like to know which games would 
have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
What is the sum of the IDs of those games?
*/
const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('./input2.txt', 'utf-8');
const redThreshold = 12;
const greenThreshold = 13;
const blueThreshold = 14;
const games = data.split('\n');

/*
const segments = [];
games.forEach((game) => {
    segments.push(game.split(';'));
});
*/
let gameArr = [];

let colors = {
    red: ' red',
    green: ' green',
    blue: ' blue'
}
const isNumber = (str) => {
    arg = parseInt(str);
    return (!Number.isNaN(arg) && typeof (arg) === 'number') ? true : false;
}

let testArr = [
    'Game 100: 2 green, 9 red',
    ' 8 red, 4 green, 9 blue',
    ' 8 blue, 13 red',
    ' 10 green, 8 blue, 6 red',
    ' 11 green, 2 red, 13 blue'
];

let testGameObj = {
    id: 1,
    red: true,
    blue: true,
    green: true
}

function evalColor(segment, color, threshold, gameIndex) {
    if (!segment.match(colors[color])) return console.log('No Match on color: ' + color);
    let index = segment.match(colors[color]).index;
    let twoBeforeColor = Array.from(segment.substring(index - 2, index));
    let colorStr = '';
    twoBeforeColor.forEach((char) => { if (isNumber(char)) colorStr += char });
    let colorTotal = parseInt(colorStr);
    //If the color # on this line is greater than the threshold for that color
    if (colorTotal > threshold) {
        gameArr[gameIndex][color] = false
    };
}
/*
let firstGame = games[28];
let firstSplit = firstGame.split(';');
let testSegment = firstSplit[0];
evalColor(testSegment, 'red', redThreshold);

console.log(testSegment);
console.log(testGameObj);
*/
//looping through games


for (let i = 0; i < games.length; i++) {
    let game = games[i];
    //console.log(match);
    let gameEnd = game.match('Game').index + 5;
    let gameNumArr = Array.from(game.substring(gameEnd, gameEnd + 3));
    let gameNum = '';
    gameNumArr.forEach((el) => { if (isNumber(el)) gameNum += el });
    let gameId = gameNum * 1;
    gameArr.push({
        id: gameId,
        red: true,
        blue: true,
        green: true
    });

    let segments = game.split(';');
    segments.forEach((segment) => {

        evalColor(segment, 'red', redThreshold, i);
        evalColor(segment, 'green', greenThreshold, i);
        evalColor(segment, 'blue', blueThreshold, i);
    });
}
console.log(gameArr);

let sum = 0;
for (const gameIndex in gameArr) {
    const game = gameArr[gameIndex];
    if (game.red === true && game.green === true && game.blue === true) {
        sum += game.id;
    }
}

console.log('sum:' + sum);