const readInput = require("../read_input");

const INPUT = readInput("14/input.txt");

function sumMem(mem) {
  return Object.keys(mem).reduce((sum, memKey) => sum + mem[memKey], 0);
}

function memIndexesWithFloatingBitsFilled(reversedBinaryIndex, floatingBits) {
  const floatingBit = floatingBits.shift();

  const a = [...reversedBinaryIndex];
  const b = [...reversedBinaryIndex];

  a[floatingBit] = "0";
  b[floatingBit] = "1";

  if (floatingBits.length === 0) {
    return [a.join(""), b.join("")];
  } else {
    return [
      ...memIndexesWithFloatingBitsFilled(a, [...floatingBits]),
      ...memIndexesWithFloatingBitsFilled(b, [...floatingBits]),
    ];
  }
}

function applyMaskToBinaryMemIndex(mask, binaryIndex) {
  const reversedBinaryIndex = binaryIndex.split("").reverse();
  const reversedResult = mask.value.split("").reverse();

  for (let i = mask.toChangeBits.length - 1; i >= 0; i--) {
    const toChangeBit = mask.toChangeBits[i];

    if (toChangeBit > reversedBinaryIndex.length - 1) {
      break;
    }

    reversedResult[toChangeBit] = reversedBinaryIndex[toChangeBit];
  }

  return memIndexesWithFloatingBitsFilled(reversedResult, [...mask.floatingBits]);
}

function writeToMem(mem, line, mask) {
  const lineParts = line.split("=");
  const binaryMemIndex = parseInt(
    lineParts[0].replace(/[^\d]/g, ""),
    10
  ).toString(2);
  const memValue = parseInt(lineParts[1].trim(), 10);
  const memIndexes = applyMaskToBinaryMemIndex(mask, binaryMemIndex);

  memIndexes.forEach((i) => {
    mem[i] = memValue;
  });

  return mem;
}

function parseMask(line) {
  const result = {};

  result.value = line.split("=")[1].trim();
  result.floatingBits = [];
  result.toChangeBits = [];

  result.value.split("").forEach((b, i) => {
    const reversedIndex = result.value.length - 1 - i;

    if (b === "0") {
      result.toChangeBits.push(reversedIndex);
    } else if (b === "X") {
      result.floatingBits.push(reversedIndex);
    }
  });

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
