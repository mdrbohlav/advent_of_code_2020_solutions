const readInput = require('./read_input');

const INPUT = readInput('01_input.txt', { mapper: (line => parseInt(line, 10)) });
const SUM = 2020;
const TOTAL_ADDITIONS = 3;

function sumArr(arr) {
  return arr.reduce((t, n) => (t + n), 0);
}

function findAnother(additions, arr) {
  const totalSoFar = sumArr(additions);

  if (totalSoFar === SUM && additions.length === TOTAL_ADDITIONS) {
    return additions;
  } else if (additions.length >= TOTAL_ADDITIONS || arr.length === 0) {
    return null;
  }
  
  for (let i = 0; i < arr.length; i++) {
    const r = findAnother([...additions, arr[i]], [...arr].splice(0, i + 1));
    
    if (r) {
      return r;
    }
  }
  
  
  return null;
}

const additions = findAnother([], INPUT);
const result = additions.reduce((t, n) => (t * n), 1);

console.log(result);
