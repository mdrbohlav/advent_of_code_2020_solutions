const readInput = require("../read_input");

const INPUT = readInput("11/input.txt", {
  mapper: (line) => line.split(""),
});

function copySeatsMap(seatsMap) {
  return JSON.parse(JSON.stringify(seatsMap));
}

function countAdjacentOccupiedSeats(seatsMap, mainSeatPosition) {
  let occupiedCount = 0;
  const rowsMinIndex = Math.max(mainSeatPosition.row - 1, 0);
  const colsMinIndex = Math.max(mainSeatPosition.col - 1, 0);
  const rowsMaxIndex = Math.min(mainSeatPosition.row + 1, seatsMap.length - 1);
  const colsMaxIndex = Math.min(
    mainSeatPosition.col + 1,
    seatsMap[0].length - 1
  );

  for (let rIndex = rowsMinIndex; rIndex <= rowsMaxIndex; rIndex++) {
    for (let cIndex = colsMinIndex; cIndex <= colsMaxIndex; cIndex++) {
      if (
        (rIndex !== mainSeatPosition.row || cIndex !== mainSeatPosition.col) &&
        seatsMap[rIndex][cIndex] === "#"
      ) {
        occupiedCount++;
      }
    }
  }

  return occupiedCount;
}

function applySeatOccupationRules(seatsMap, roundsCount = 0) {
  const resultSeatsMap = copySeatsMap(seatsMap);
  let totalOccupiedSeats = 0;
  let occupationChanges = 0;

  for (let rIndex = 0; rIndex < seatsMap.length; rIndex++) {
    for (let cIndex = 0; cIndex < seatsMap[0].length; cIndex++) {
      const seatPosition = {
        row: rIndex,
        col: cIndex,
      };
      const occupiedAdjacentCount = countAdjacentOccupiedSeats(
        seatsMap,
        seatPosition
      );

      if (seatsMap[rIndex][cIndex] === "L" && occupiedAdjacentCount === 0) {
        resultSeatsMap[rIndex][cIndex] = "#";
        occupationChanges++;
      } else if (
        seatsMap[rIndex][cIndex] === "#" &&
        occupiedAdjacentCount >= 4
      ) {
        resultSeatsMap[rIndex][cIndex] = "L";
        occupationChanges++;
      }

      if (resultSeatsMap[rIndex][cIndex] === "#") {
        totalOccupiedSeats++;
      }
    }
  }

  if (occupationChanges > 0) {
    return applySeatOccupationRules(resultSeatsMap, roundsCount + 1);
  }

  return {
    seatsMap: resultSeatsMap,
    totalOccupiedSeats,
    roundsCount,
  };
}

const afterOccupationRules = applySeatOccupationRules(INPUT);
const result = afterOccupationRules.totalOccupiedSeats;

console.log(result);
