const readInput = require("../read_input");

const INPUT = readInput("08/input.txt");

function runInstruction(instruction) {
  let accumulator = 0;
  let index = 1;

  if (instruction.name === 'acc') {
    accumulator = instruction.value;
  } else if (instruction.name === 'jmp') {
    index = instruction.value;
  }

  return { accumulator, index };
}

function runInstructions(instructions) {
  let accumulator = 0;

  for (let index = 0; index < instructions.length;) {
    const instruction = instructions[index];

    if (instruction.ran) {
      return accumulator;
    }

    const instructionResult = runInstruction(instruction, index, accumulator);
    instruction.ran = true;
    accumulator += instructionResult.accumulator;
    index += instructionResult.index;
  }

  return accumulator;
}

function parseLine(line) {
  const parts = line.split(' ');
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
