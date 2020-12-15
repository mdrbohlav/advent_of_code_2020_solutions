const readInput = require("../read_input");

const INPUT = readInput("15/input.txt");
const TOTAL_NUMBERS = 2020;

function nextNumber(sequence, totalNumbers) {
  const lastNumber = sequence[sequence.length - 1];
  const lastTurn = sequence.length;
  const lastButOneTurn =
    sequence.lastIndexOf(lastNumber, sequence.length - 2) + 1;
  const newNumber = lastButOneTurn === 0 ? 0 : lastTurn - lastButOneTurn;

  sequence.push(newNumber);

  if (sequence.length === totalNumbers) {
    return newNumber;
  }

  return nextNumber(sequence, totalNumbers);
}

function parseInput(input) {
  return input[0].split(",").map(n => parseInt(n, 10));
}

const sequence = parseInput(INPUT);
const result = nextNumber(sequence, TOTAL_NUMBERS);

console.log(sequence, result);
