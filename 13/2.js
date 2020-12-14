const readInput = require("../read_input");

const INPUT = readInput("13/input.txt");

function lcm(a, b) {
  let min = a < b ? a : b;

  while (min >= BigInt(2)) {
    if (a % min === BigInt(0) && b % min === BigInt(0)) {
      return (a * b) / min;
    }

    min--;
  }

  return a * b;
}

function earliestTimestampWithDeparturesAfterSpecifiedMinutes(buses) {
  let timestamp = BigInt(0);
  let step = BigInt(1);

  buses.forEach((b) => {
    while((timestamp + b.offset) % b.id !== BigInt(0)) {
      timestamp += step;
    }

    step = lcm(step, b.id);
  });

  return timestamp;
}

function parseBusesWithDepartDelay(buses) {
  return buses
    .split(",")
    .map((id, index) => {
      if (id === "x") {
        return null;
      }

      return {
        id: BigInt(parseInt(id, 10)),
        offset: BigInt(index),
      };
    })
    .filter((b) => b);
}

const busesWithDepartDelay = parseBusesWithDepartDelay(INPUT[1]);
const result = earliestTimestampWithDeparturesAfterSpecifiedMinutes(
  busesWithDepartDelay
);

console.log(result);
