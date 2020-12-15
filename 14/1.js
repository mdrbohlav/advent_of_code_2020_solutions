const readInput = require("../read_input");

const INPUT = readInput("14/input.txt");

function sumMem(mem) {
  return Object.keys(mem).reduce(
    (sum, memKey) => sum + parseInt(mem[memKey], 2),
    0
  );
}

function applyMaskToValue(mask, value) {
  const reversedValue = value.split("").reverse();
  const reversedResult = mask.value.split("").reverse();

  for (let i = mask.toChangeBits.length - 1; i >= 0; i--) {
    const toChangeBit = mask.toChangeBits[i];

    if (toChangeBit > reversedValue.length - 1) {
      reversedResult[toChangeBit] = "0";
    } else {
      reversedResult[toChangeBit] = reversedValue[toChangeBit];
    }
  }

  return reversedResult.reverse().join("");
}

function writeToMem(mem, line, mask) {
  const lineParts = line.split("=");
  const memIndex = lineParts[0].replace(/[^\d]/g, "");
  const memValue = parseInt(lineParts[1].trim(), 10).toString(2);

  mem[memIndex] = applyMaskToValue(mask, memValue);

  return mem;
}

function parseMask(line) {
  const result = {};

  result.value = line.split("=")[1].trim();
  result.toChangeBits = result.value.split("").reduce((arr, b, index) => {
    if (b !== "X") {
      return arr;
    }

    const reversedIndex = result.value.length - 1 - index;

    return [...arr, reversedIndex];
  }, []);

  return result;
}

function processInput(input) {
  let mem = {};
  let mask;

  input.forEach((line) => {
    const isMask = line.startsWith("mask");

    if (isMask) {
      mask = parseMask(line);
    } else {
      writeToMem(mem, line, mask);
    }
  });

  return mem;
}

const mem = processInput(INPUT);
const result = sumMem(mem);

console.log(result);
