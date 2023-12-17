/*
The Elf would first like to know which games would 
have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
What is the sum of the IDs of those games?
*/
const fs = require('fs');
const { default: test } = require('node:test');
const data = fs.readFileSync('./input2.txt', 'utf-8');
const games = data.split('\n');
let firstGame = games[0];
console.log(firstGame);

const segments = [];
games.forEach((game) => {
    segments.push(game.split(';'));
});
//console.log(segments);
/*
let gameObj = {
    id: null,
    tries: [
        ' 3 blue, 11 red, 6 green',
        ' 4 red, 1 green'
    ]
}
*/

let gameArr = [];

let colors = {
    red: ' red',
    green: ' green',
    blue: ' blue'
}

console.log('color map red ' + colors.red);

let testArr = [
    'Game 100: 2 green, 9 red',
    ' 8 red, 4 green, 9 blue',
    ' 8 blue, 13 red',
    ' 10 green, 8 blue, 6 red',
    ' 11 green, 2 red, 13 blue'
];

const re = /\d/;
let testSegment = firstGame.split(';');
console.log(testSegment);
let game = testSegment[0];
console.log(game);

console.log(game.match(colors.red));
let redIndex = game.match(colors.red).index;
console.log('Red index: ' + redIndex);
let twoBeforeColor = Array.from(game.substring(redIndex - 2, redIndex));
console.log('Two before color: ' + twoBeforeColor);

//console.log(typeof (parseInt(twoBeforeColor[1])));

const isNumber = (arg) => {
    arg = parseInt(arg);
    (!Number.isNaN(arg) && typeof (arg) === 'number') ? true : false;
}
console.log(parseInt(twoBeforeColor[0]));
console.log(typeof parseInt(' '));
console.log(isNumber(' '));

/*s
let gameEnd = game.match('Game').index + 5;
let gameNumArr = Array.from(game.substring(gameEnd, gameEnd + 3));
let gameNum = '';
gameNumArr.forEach((el) => { if (el.match(re)) gameNum += el });
gameArr.push({
    id: gameNum * 1
});


console.log(gameArr)
*/

/*
for (let i = 0; i < games.length; i++) {
    let game = games[i];
    const re = /\d/;
    //console.log(match);
    let gameEnd = game.match('Game').index + 5;
    let gameNumArr = Array.from(game.substring(gameEnd, gameEnd + 3));
    let gameNum = '';
    gameNumArr.forEach((el) => { if (el.match(re)) gameNum += el });
    gameArr.push({
        id: gameNum * 1
    });
}
console.log(gameArr);
*/