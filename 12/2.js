const readInput = require("../read_input");

const INPUT = readInput("12/input.txt");
const START_SHIP_POSITION = {
  N: 0,
  S: 0,
  E: 0,
  W: 0,
};
const START_WAYPOINT = {
  N: 1,
  S: 0,
  E: 10,
  W: 0,
};

function rotate(move, waypoint) {
  const cardinalDirections = ["N", "E", "S", "W"];
  const rotateByIndex = move.value / 90;
  const newWaypoint = { ...waypoint };

  cardinalDirections.forEach((direction, index) => {
    let rotatedIndex =
      move.instruction === "R" ? index + rotateByIndex : index - rotateByIndex;
    const subtractFromCountOfDirections = rotatedIndex < 0;
    rotatedIndex = Math.abs(rotatedIndex) % 4;

    if (subtractFromCountOfDirections) {
      rotatedIndex = cardinalDirections.length - rotatedIndex;
    }

    newWaypoint[cardinalDirections[rotatedIndex]] = waypoint[direction];
  });

  return newWaypoint;
}

function moveShipToWaypoint(shipPosition, waypoint, times) {
  const cardinalDirections = ["N", "E", "S", "W"];

  cardinalDirections.forEach((d) => {
    shipPosition[d] += waypoint[d] * times;
  });

  return shipPosition;
}

function move(instructions, shipPosition, waypoint) {
  if (instructions.length === 0) {
    const finalNS = shipPosition.N - shipPosition.S;
    const finalEW = shipPosition.E - shipPosition.W;
    const manhattanDistance = Math.abs(finalNS) + Math.abs(finalEW);

    return manhattanDistance;
  }

  const currentMove = instructions.shift();

  if (currentMove.instruction === "F") {
    shipPosition = moveShipToWaypoint(
      shipPosition,
      waypoint,
      currentMove.value
    );
  } else if (["N", "S", "E", "W"].indexOf(currentMove.instruction) > -1) {
    waypoint[currentMove.instruction] += currentMove.value;
  } else if (["L", "R"].indexOf(currentMove.instruction) > -1) {
    waypoint = rotate(currentMove, waypoint);
  }

  return move(instructions, shipPosition, waypoint);
}

function parseInstructions(input) {
  return input.map((line) => {
    const instruction = line.replace(/\d/g, "");
    const value = parseInt(line.replace(/[^\d]/g, ""), 10);

    return { instruction, value };
  });
}

const instructions = parseInstructions(INPUT);
const result = move(instructions, START_SHIP_POSITION, START_WAYPOINT);

console.log(result);
