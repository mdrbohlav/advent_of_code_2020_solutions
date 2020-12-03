const fs = require('fs');

function defaultMapper(line) {
  return line.trim();
}

function readInput(fileName, mapper = defaultMapper) {
  const input = fs.readFileSync(fileName, 'utf8');
  
  return input.split('\n').filter(line => line).map(mapper);
}

module.exports = readInput;
