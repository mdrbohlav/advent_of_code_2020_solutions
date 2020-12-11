const readInput = require("../read_input");

const INPUT = readInput("11/input.txt", {
  mapper: (line) => line.split(""),
});

function copySeatsMap(seatsMap) {
  return JSON.parse(JSON.stringify(seatsMap));
}

function getLeft(
  seatsMap,
  mainSeatPosition,
  colDelta,
  rIndex = mainSeatPosition.row
) {
  const possibleCol = mainSeatPosition.col - colDelta;

  if (possibleCol < 0 || seatsMap[rIndex][possibleCol] === ".") {
    return null;
  }

  return { row: rIndex, col: possibleCol };
}

function getCenter(seatsMap, mainSeatPosition, rIndex) {
  if (seatsMap[rIndex][mainSeatPosition.col] === ".") {
    return null;
  }

  return { row: rIndex, col: mainSeatPosition.col };
}

function getRight(
  seatsMap,
  mainSeatPosition,
  colDelta,
  rIndex = mainSeatPosition.row
) {
  const possibleCol = mainSeatPosition.col + colDelta;

  if (
    possibleCol >= seatsMap[0].length ||
    seatsMap[rIndex][possibleCol] === "."
  ) {
    return null;
  }

  return { row: rIndex, col: possibleCol };
}

function getAboveSeatsPositions(seatsMap, mainSeatPosition) {
  if (mainSeatPosition.row === 0) {
    return [];
  }

  let left = null;
  let center = null;
  let right = null;

  for (let i = mainSeatPosition.row - 1; i >= 0; i--) {
    if (!left) {
      left = getLeft(seatsMap, mainSeatPosition, mainSeatPosition.row - i, i);
    }

    if (!center) {
      center = getCenter(seatsMap, mainSeatPosition, i);
    }

    if (!right) {
      right = getRight(seatsMap, mainSeatPosition, mainSeatPosition.row - i, i);
    }

    if (left && center && right) {
      break;
    }
  }

  return [left, center, right].filter((p) => p !== null);
}

function getTheSameRowSeatsPositions(seatsMap, mainSeatPosition) {
  const distanceToLeft = mainSeatPosition.col;
  const distanceToRight = seatsMap[0].length - distanceToLeft - 1;
  const maxSideDistance = Math.max(distanceToLeft, distanceToRight);

  let left = null;
  let right = null;

  for (let i = 1; i < maxSideDistance; i++) {
    if (!left && mainSeatPosition.col - i >= 0) {
      left = getLeft(seatsMap, mainSeatPosition, i);
    }

    if (!right && mainSeatPosition.col + i < seatsMap[0].length) {
      right = getRight(seatsMap, mainSeatPosition, i);
    }

    if (left && right) {
      break;
    }
  }

  return [left, right].filter((p) => p !== null);
}

function getBelowSeatsPositions(seatsMap, mainSeatPosition) {
  if (mainSeatPosition.row === seatsMap.length - 1) {
    return [];
  }

  let left = null;
  let center = null;
  let right = null;

  for (let i = mainSeatPosition.row + 1; i < seatsMap.length; i++) {
    if (!left) {
      left = getLeft(seatsMap, mainSeatPosition, i - mainSeatPosition.row, i);
    }

    if (!center) {
      center = getCenter(seatsMap, mainSeatPosition, i);
    }

    if (!right) {
      right = getRight(seatsMap, mainSeatPosition, i - mainSeatPosition.row, i);
    }

    if (left && center && right) {
      break;
    }
  }

  return [left, center, right].filter((p) => p !== null);
}

function firstSeatInEachDirectionPositions(seatsMap, mainSeatPosition) {
  let positions = [];
  positions = positions.concat(
    getAboveSeatsPositions(seatsMap, mainSeatPosition)
  );
  positions = positions.concat(
    getTheSameRowSeatsPositions(seatsMap, mainSeatPosition)
  );
  positions = positions.concat(
    getBelowSeatsPositions(seatsMap, mainSeatPosition)
  );

  return positions;
}

function countOccupiedSeats(seatsMap, seatsPositions) {
  return seatsPositions.reduce((occupiedCount, pos) => {
    if (seatsMap[pos.row][pos.col] !== "#") {
      return occupiedCount;
    }

    return occupiedCount + 1;
  }, 0);
}

function applySeatOccupationRules(
  seatsMap,
  roundsCount = 0,
  toCheckSeatsPositions = []
) {
  const resultSeatsMap = copySeatsMap(seatsMap);
  let totalOccupiedSeats = 0;
  let occupationChanges = 0;

  for (let rIndex = 0; rIndex < seatsMap.length; rIndex++) {
    if (roundsCount === 0) {
      toCheckSeatsPositions.push([]);
    }

    for (let cIndex = 0; cIndex < seatsMap[0].length; cIndex++) {
      if (roundsCount === 0) {
        const seatsPositions = firstSeatInEachDirectionPositions(seatsMap, {
          row: rIndex,
          col: cIndex,
        });
        toCheckSeatsPositions[rIndex].push(seatsPositions);
      }

      const occupiedCount = countOccupiedSeats(
        seatsMap,
        toCheckSeatsPositions[rIndex][cIndex],
      );

      if (seatsMap[rIndex][cIndex] === "L" && occupiedCount === 0) {
        resultSeatsMap[rIndex][cIndex] = "#";
        occupationChanges++;
      } else if (
        seatsMap[rIndex][cIndex] === "#" &&
        occupiedCount >= 5
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
    return applySeatOccupationRules(resultSeatsMap, roundsCount + 1, toCheckSeatsPositions);
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
