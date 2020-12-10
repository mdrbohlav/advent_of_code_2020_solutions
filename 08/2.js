const readInput = require("../read_input");

const INPUT = readInput("08/input.txt");

function copyInstructions(instructions) {
  return instructions.map(i => ({ ...i }));
}

function runInstruction(instruction) {
  let accumulator = 0;
  let index = 1;

  if (instruction.name === "acc") {
    accumulator = instruction.value;
  } else if (instruction.name === "jmp") {
    index = instruction.value;
  }

  return { accumulator, index };
}

function runUpdatedInstructions(instructions) {
  let accumulator = 0;

  for (let index = 0; index < instructions.length; ) {
    const instruction = instructions[index];

    if (instruction.ran) {
      return null;
    }

    const instructionResult = runInstruction(instruction, index, accumulator);
    instruction.ran = true;
    accumulator += instructionResult.accumulator;
    index += instructionResult.index;
  }

  return accumulator;
}

function runInstructions(originalInstructions) {
  let instructionsToRun = copyInstructions(originalInstructions);
  let updateInstructionIndex = -1;

  while (updateInstructionIndex < originalInstructions.length) {
    const result = runUpdatedInstructions(instructionsToRun);

    if (result !== null) {
      return result;
    }

    updateInstructionIndex = originalInstructions.findIndex(
      (instruction, index) =>
        instruction.name !== "acc" && index > updateInstructionIndex
    );

    if (updateInstructionIndex < 0) {
      return null;
    }

    instructionsToRun = copyInstructions(originalInstructions);
    instructionsToRun[updateInstructionIndex].name =
      instructionsToRun[updateInstructionIndex].name === "jmp" ? "nop" : "jmp";
  }

  return null;
}

function parseLine(line) {
  const parts = line.split(" ");
  const name = parts[0];
  const value = parseInt(parts[1], 10);

  return {
    name,
    value,
    ran: false,
  };
}

function parseInstructions(input) {
  return input.map(parseLine);
}

const instructions = parseInstructions(INPUT);
const result = runInstructions(instructions);

console.log(result);
