const readInput = require("../read_input");

const INPUT = readInput("12/input.txt");
const START_POS = {
  facing: "E",
  N: 0,
  S: 0,
  E: 0,
  W: 0,
};

function rotate(move, currentPosition) {
  const cardinalDirections = ["N", "E", "S", "W"];
  const rotateByIndex = move.value / 90;

  const currentFacingIndex = cardinalDirections.indexOf(currentPosition.facing);
  let newFacingIndex =
    move.instruction === 'R'
      ? currentFacingIndex + rotateByIndex
      : currentFacingIndex - rotateByIndex;
  const subtractFromCountOfDirections = newFacingIndex < 0;
  newFacingIndex = Math.abs(newFacingIndex) % 4;

  if (subtractFromCountOfDirections) {
    newFacingIndex = cardinalDirections.length - newFacingIndex;
  }
  
  currentPosition.facing = cardinalDirections[newFacingIndex];

  return currentPosition;
}

function move(instructions, currentPosition) {
  if (instructions.length === 0) {
    const finalNS = currentPosition.N - currentPosition.S;
    const finalEW = currentPosition.E - currentPosition.W;
    const manhattanDistance = Math.abs(finalNS) + Math.abs(finalEW);

    return manhattanDistance;
  }

  const currentMove = instructions.shift();

  if (currentMove.instruction === "F") {
    currentPosition[currentPosition.facing] += currentMove.value;
  } else if (["N", "S", "E", "W"].indexOf(currentMove.instruction) > -1) {
    currentPosition[currentMove.instruction] += currentMove.value;
  } else if (["L", "R"].indexOf(currentMove.instruction) > -1) {
    currentPosition = rotate(currentMove, currentPosition);
  }

  return move(instructions, currentPosition);
}

function parseInstructions(input) {
  return input.map((line) => {
    const instruction = line.replace(/\d/g, "");
    const value = parseInt(line.replace(/[^\d]/g, ""), 10);

    return { instruction, value };
  });
}

const instructions = parseInstructions(INPUT);
const result = move(instructions, START_POS);

console.log(result);
