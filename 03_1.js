const readInput = require('./read_input');

const INPUT = readInput('03_input.txt');
const MOVE = {
  horizontal: 3,
  vertical: 1,
};

function countTrees(positions) {
  return positions.filter(p => p === 'X').length;
}

function getNextPosition(map, move, horizontal, vertical) {
  const vIndex = vertical + move.vertical;

  if (vIndex > map.length - 1) {
    return [];
  }

  const mapWidth = map[vIndex].length;
  const hIndex = (horizontal + move.horizontal) % mapWidth;
  const position = map[vIndex][hIndex] === '.' ? '0' : 'X';

  return [position, ...getNextPosition(map, move, hIndex, vIndex)];
}

function getPositions(input, move) {
  return getNextPosition(input, move, 0, 0);
}

const positions = getPositions(INPUT, MOVE);
const result = countTrees(positions);

console.log(result);