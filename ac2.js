const fs = require('fs');
const data = fs.readFileSync('./input2.txt', 'utf-8');
const redThreshold = 12;
const greenThreshold = 13;
const blueThreshold = 14;
const games = data.split('\n');
const gameArr = [];
const colors = {
    red: ' red',
    green: ' green',
    blue: ' blue'
}

function isNumber(str) {
    arg = parseInt(str);
    return (!Number.isNaN(arg) && typeof (arg) === 'number') ? true : false;
}

function evalColor(segment, color, threshold, gameIndex) {
    if (!segment.match(colors[color])) return;
    const index = segment.match(colors[color]).index;
    const twoBeforeColor = Array.from(segment.substring(index - 2, index));
    let colorStr = '';
    twoBeforeColor.forEach((char) => { if (isNumber(char)) colorStr += char });
    const colorTotal = parseInt(colorStr);
    //If the color # on this line is greater than the threshold for that color
    if (colorTotal > threshold) {
        gameArr[gameIndex][color] = false
    };
}

let sum = 0;
for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const gameEnd = game.match('Game').index + 5;
    const gameNumArr = Array.from(game.substring(gameEnd, gameEnd + 3));
    let gameNum = '';
    gameNumArr.forEach((el) => { if (isNumber(el)) gameNum += el });
    let gameId = gameNum * 1;
    gameArr.push({
        id: gameId,
        red: true,
        blue: true,
        green: true
    });
    const segments = game.split(';');
    segments.forEach((segment) => {
        evalColor(segment, 'red', redThreshold, i);
        evalColor(segment, 'green', greenThreshold, i);
        evalColor(segment, 'blue', blueThreshold, i);
    });
    if (gameArr[i].red === true && gameArr[i].green === true && gameArr[i].blue === true) {
        sum += gameArr[i].id;
    }
}

//console.log(gameArr);
console.log('Sum of game IDs: ' + sum);