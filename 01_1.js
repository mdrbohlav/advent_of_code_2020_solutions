const readInput = require('./read_input');

const INPUT = readInput('01_input.txt', { mapper: (line => parseInt(line, 10)) });
const SUM = 2020;

function getAdditions(arr) {
  for (let index = 0; index < arr.length; index++) {
    const possibleFirstAddition = arr[index];
    const requiredSecondAddition = SUM - possibleFirstAddition;
    const secondAdditionExists = arr.find((n, i) => n === requiredSecondAddition && i !== index);
  
    if (secondAdditionExists) {
      return [possibleFirstAddition, requiredSecondAddition];
    }
  }

  return [];
}

const additions = getAdditions(INPUT);
const result = additions.reduce((t, n) => (t * n), 1);

console.log(result);
