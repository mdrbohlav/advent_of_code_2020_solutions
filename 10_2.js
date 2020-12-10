const readInput = require("./read_input");

const INPUT = readInput("10_input.txt", {
  mapper: (line) => parseInt(line, 10),
});

function findLastIndex(array, comparator) {
  var index = array.slice().reverse().findIndex(comparator);
  var count = array.length - 1;
  var finalIndex = index >= 0 ? count - index : index;

  return finalIndex;
}

function findValidAdapterArangementsCount(
  adapters,
  joltage,
  deviceJoltage,
  joltageCounts = {}
) {
  if (adapters.length === 0 || joltage >= deviceJoltage - 3) {
    return 1;
  }

  const lastValidAdapterIndex = findLastIndex(
    adapters,
    (a) => a <= joltage + 3
  );
  const possibleAdaptersCount = lastValidAdapterIndex + 1;
  let result = 0;

  for (let i = 0; i < possibleAdaptersCount; i++) {
    const newJoltage = adapters[i];
    joltageCounts[newJoltage] =
      joltageCounts[newJoltage] ||
      findValidAdapterArangementsCount(
        adapters.slice(i + 1),
        newJoltage,
        deviceJoltage,
        joltageCounts
      );

    result += joltageCounts[newJoltage];
  }

  return result;
}

function sortedAdapters(adapters) {
  return adapters.sort((a, b) => a - b);
}

const adapters = sortedAdapters(INPUT);
const deviceJoltage = adapters[adapters.length - 1] + 3;
const result = findValidAdapterArangementsCount(adapters, 0, deviceJoltage);

console.log(result);
