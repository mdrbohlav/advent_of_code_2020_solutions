const fs = require('fs');

function defaultMapper(line) {
  return line.trim();
}

function readInput(fileName, options = {}) {
  let input = fs.readFileSync(fileName, 'utf8').split('\n');

  if (!options.includeEmptyLines) {
    input = input.filter(line => line);
  }

  if (!options.mapper) {
    options.mapper = defaultMapper;
  }

  return input.map(options.mapper);
}

module.exports = readInput;
