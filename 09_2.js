const readInput = require("./read_input");

const INPUT = readInput("09_input.txt");
const PREAMBLE_LENGTH = 25;

function sumMinMax(arr) {
  if (!arr) {
    return null;
  }

  return Math.min(...arr) + Math.max(...arr);
}

function contigousSetIndexesWhoseValuesSumToIndexValue(data, index) {
  const sum = data[index];
  let startIndex = 0;
  let total = 0;

  for (let i = 0; i < index; i++) {
    if (total + data[i] > sum) {
      i = startIndex;
      startIndex++;
      total = 0;
    } else {
      total += data[i];
    }

    if (total === sum) {
      return [startIndex, i];
    }
  }

  return null;
}

function findContigousSetThatSumsToIndexValue(data, index) {
  const indexes = contigousSetIndexesWhoseValuesSumToIndexValue(data, index);

  if (!indexes) {
    return null;
  }

  return data.slice(indexes[0], indexes[1] + 1);
}

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

function findFirstInvalidIndex(data, preambleLength) {
  for (let i = preambleLength; i < data.length; i++) {
    const preamble = data.slice(i - preambleLength, i);
    const isValid = isNextNumberValid(preamble, data[i]);

    if (!isValid) {
      return i;
    }
  }

  return -1;
}

function parseInput(input) {
  return input.map((n) => parseInt(n, 10));
}

const data = parseInput(INPUT);
const firstInvalidIndex = findFirstInvalidIndex(data, PREAMBLE_LENGTH);
const contiguosSetThatSumsToIndexValue = findContigousSetThatSumsToIndexValue(
  data,
  firstInvalidIndex
);
const result = sumMinMax(contiguosSetThatSumsToIndexValue);

console.log(result);
