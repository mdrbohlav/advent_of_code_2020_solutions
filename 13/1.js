const readInput = require("../read_input");

const INPUT = readInput("13/input.txt");

function closestBusIdMultipliedByWaitTime(bus, earliestDepartAt) {
  const waitTime = bus.closestDepartAt - earliestDepartAt;

  return bus.id * waitTime;
}

function sortBusesByClosestDepartAt(buses) {
  return buses.sort((a, b) => (a.closestDepartAt - b.closestDepartAt));
}

function countBusesClosestDepartAt(busesIds, earliestDepartAt) {
  return busesIds.map(id => {
    let minFactor = earliestDepartAt / id;

    if (minFactor % 1 > 0) {
      minFactor = Math.floor(minFactor) + 1;
    }

    const closestDepartAt = minFactor * id;

    return {
      id,
      closestDepartAt,
    };
  });
}

function parseBusesIds(buses) {
  return buses.split(',').filter(bId => bId !== 'x').map(bId => parseInt(bId, 10));
}

const earliestDepartAt = parseInt(INPUT[0]);
const busesIds = parseBusesIds(INPUT[1]);
const busesClosestDepartAt = countBusesClosestDepartAt(busesIds, earliestDepartAt);
const sortedBusesByClosestDepartAt = sortBusesByClosestDepartAt(busesClosestDepartAt);
const result = closestBusIdMultipliedByWaitTime(sortedBusesByClosestDepartAt[0], earliestDepartAt);

console.log(result);
