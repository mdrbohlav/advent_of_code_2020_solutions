const readInput = require("./read_input");

const INPUT = readInput("09_input.txt");
const PREAMBLE_LENGTH = 25;

function isNextNumberValid(preamble, number) {
  for (let i = 0; i < preamble.length; i++) {
    const possibleFirstAddition = preamble[i];
    const requiredSecondAddition = number - possibleFirstAddition;

    if (possibleFirstAddition !== requiredSecondAddition) {
      const secondAdditionExists = preamble.find(
        (n, j) => n === requiredSecondAddition && j !== i
      );

      if (secondAdditionExists) {
        return true;
      }
    }
  }

  return false;
}

function checkSequence(data, preambleLength) {
  for (let i = preambleLength; i < data.length; i++) {
    const preamble = data.slice(i - preambleLength, i);
    const isValid = isNextNumberValid(preamble, data[i]);

    if (!isValid) {
      return data[i];
    }
  }

  return null;
}

function parseInput(input) {
  return input.map((n) => parseInt(n, 10));
}

const data = parseInput(INPUT);
const result = checkSequence(data, PREAMBLE_LENGTH);

console.log(result);
