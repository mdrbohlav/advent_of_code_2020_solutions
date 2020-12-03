const readInput = require('./read_input');

const INPUT = readInput('02_input.txt');

function countOfCharsInString(string, char) {
  let occurences = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      occurences++;
    }
  }

  return occurences;
}

function isPasswordValidToPolicy(password, policy) {
  const charOccurences = countOfCharsInString(password, policy.char);
  const isInRange = charOccurences >= policy.range.min && charOccurences <= policy.range.max;

  return isInRange;
}

function parsePolicy(policy) {
  const parts = policy.split(/\s/);
  const rangeParts = parts[0].split("-").map(n => parseInt(n, 10));
  const char = parts[1];

  return {
    range: {
      min: Math.min(...rangeParts),
      max: Math.max(...rangeParts),
    },
    char,
  };
}

function isRecordValid(record) {
  const parts = record.split(':');
  const policy = parsePolicy(parts[0]);
  const password = parts[1].trim();
  const isValid = isPasswordValidToPolicy(password, policy)

  return isValid;
}

const validPasswords = INPUT.filter(isRecordValid);
const result = validPasswords.length;

console.log(result);
