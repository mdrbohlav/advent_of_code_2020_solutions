const readInput = require("./read_input");

const INPUT = readInput("10_input.txt", {
  mapper: (line) => parseInt(line, 10),
});

function countJoltageDifferences(joltageDifferences) {
  return joltageDifferences.reduce(
    (result, difference) => {
      result[difference]++;
      return result;
    },
    {
      1: 0,
      2: 0,
      3: 0,
    }
  );
}

function adaptersJoltageDiferences(adapters, joltage, deviceJoltage) {
  if (adapters.length === 0) {
    return [];
  }

  const newAdapterJoltage = adapters.shift();
  const difference = newAdapterJoltage - joltage;

  if (
    joltage < newAdapterJoltage - 3 ||
    joltage > newAdapterJoltage + 3 ||
    newAdapterJoltage >= deviceJoltage - 3
  ) {
    return [difference];
  }

  return [
    difference,
    ...adaptersJoltageDiferences(adapters, newAdapterJoltage, deviceJoltage),
  ];
}

function sortedAdapters(adapters) {
  return adapters.sort((a, b) => a - b);
}

const adapters = sortedAdapters(INPUT);
const deviceJoltage = adapters[adapters.length - 1] + 3;
const joltageDifferences = [
  ...adaptersJoltageDiferences([...adapters], 0, deviceJoltage),
  3,
];
const joltageDifferencesCount = countJoltageDifferences(joltageDifferences);
const result = joltageDifferencesCount['1'] * joltageDifferencesCount['3'];

console.log(result);
