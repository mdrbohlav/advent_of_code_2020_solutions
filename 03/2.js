const readInput = require('../read_input');

const INPUT = readInput('03/input.txt');
const MOVES = [
  {
    horizontal: 1,
    vertical: 1,
  }, {
    horizontal: 3,
    vertical: 1,
  }, {
    horizontal: 5,
    vertical: 1,
  }, {
    horizontal: 7,
    vertical: 1,
  }, {
    horizontal: 1,
    vertical: 2,
  }
];

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

function getPositions(input, moves) {
  const positionsForMoves = [];

  moves.forEach(move => {
    positionsForMoves.push(getNextPosition(input, move, 0, 0));
  });

  return positionsForMoves;
}

const positions = getPositions(INPUT, MOVES);
const trees = positions.map(p => countTrees(p));
const result = trees.reduce((t, n) => (t * n), 1);

console.log(result);