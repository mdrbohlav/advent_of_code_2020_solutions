const readInput = require("../read_input");

const INPUT = readInput("15/input.txt");
const TOTAL_NUMBERS = 30000000;

function lastNumber(sequence, turns, totalNumbers) {
  for (let i = sequence.length; i < totalNumbers; i++) {
    const lastNumber = sequence[i - 1];
    const lastTurn = turns[lastNumber];

    sequence[i] = lastTurn === undefined ? 0 : i - lastTurn;
    turns[lastNumber] = i;
  }

  return sequence[sequence.length - 1];
}

function parseInput(input) {
  let result = {
    sequence: [],
    turns: {},
  };

  result.sequence = input[0].split(",");
  result.sequence = result.sequence.map((n, i) => {
    result.turns[n] = i + 1;

    return parseInt(n, 10);
  });

  return result;
}

const { sequence, turns } = parseInput(INPUT);
const result = lastNumber(sequence, turns, TOTAL_NUMBERS);

console.log(result);
