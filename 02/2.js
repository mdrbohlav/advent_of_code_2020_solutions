
const readInput = require('../read_input');

const INPUT = readInput('02/input.txt');

function isPasswordValidToPolicy(password, policy) {
  let found = false;

  for (let i = 0; i < policy.indexes.length; i++) {
    const passwordIndex = policy.indexes[i];

    if (password[passwordIndex] === policy.char) {
      if (found) { 
        return false;
      }

      found = true;
    }
  }

  return found;
}

function parsePolicy(policy) {
  const parts = policy.split(/\s/);
  const indexes = parts[0].split("-").map(n => parseInt(n, 10) - 1);
  const char = parts[1];

  return {
    indexes,
    char,
  };
}

function isRecordValid(record) {
  const parts = record.split(':');
  const policy = parsePolicy(parts[0]);
  const password = parts[1].trim();
  const isValid = isPasswordValidToPolicy(password, policy);

  return isValid;
}

const validPasswords = INPUT.filter(isRecordValid);
const result = validPasswords.length;

console.log(result);
