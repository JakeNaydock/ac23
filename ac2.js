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

function evalColor(segment, color, gameIndex) {
    if (!segment.match(colors[color])) return;
    const index = segment.match(colors[color]).index;
    const twoBeforeColor = Array.from(segment.substring(index - 2, index));
    let colorStr = '';
    twoBeforeColor.forEach((char) => { if (isNumber(char)) colorStr += char });
    const colorTotal = parseInt(colorStr);
    //Get the current highest color total for this obj
    let currentTotal = gameArr[gameIndex][color];
    //If color total for this segment is greater than current highest, replace it
    if (colorTotal > currentTotal) {
        gameArr[gameIndex][color] = colorTotal;
    };
}

let p1sum = 0;
let p2sum = 0;
for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const gameEnd = game.match('Game').index + 5;
    const gameNumArr = Array.from(game.substring(gameEnd, gameEnd + 3));
    let gameNum = '';
    gameNumArr.forEach((el) => { if (isNumber(el)) gameNum += el });
    let gameId = gameNum * 1;
    //Create an object per game id. Will store the highest # of colors seen in a game.
    gameArr.push({
        id: gameId,
        red: 0,
        blue: 0,
        green: 0
    });
    //Splitting into segments ensure colors are unique
    const segments = game.split(';');
    //Update the obj for this ID with the highest counts per color
    segments.forEach((segment) => {
        evalColor(segment, 'red', i);
        evalColor(segment, 'green', i);
        evalColor(segment, 'blue', i);
    });
    //part 1 answer
    if (gameArr[i].red <= redThreshold && gameArr[i].green <= greenThreshold && gameArr[i].blue <= blueThreshold) {
        p1sum += gameArr[i].id;
    }
    //part 2 answer
    p2sum += gameArr[i].red * gameArr[i].green * gameArr[i].blue;
}

console.log('Part 1 sum: ' + p1sum);
console.log('Part 2 sum: ' + p2sum);