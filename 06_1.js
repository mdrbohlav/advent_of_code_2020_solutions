const readInput = require('./read_input');

const INPUT = readInput('06_input.txt', { includeEmptyLines: true });

function countTotalYes(yesForGroups) {
  return yesForGroups.reduce((t, n) => (t + n), 0);
}

function uniqueFilter(value, index, array) {
  return array.indexOf(value) === index;
}

function countUniqueYesForGroups(groups) {
  return groups.map(g => g.filter(uniqueFilter).length);
}

function getGroupsFromInput(input) {
  const groups = [];

  input.forEach((line, index) => {
    if (line !== '') {
      let groupIndex = groups.length - 1;

      if (groups.length === 0) {
        groupIndex = 0;
      } else if (input[index - 1] === '') {
        groupIndex = groups.length;
      }

      const group = line.split('');

      if (groupIndex >= groups.length) {
        groups.push(group);
      } else {
        groups[groupIndex] = [...groups[groupIndex], ...group];
      }
    }
  });

  return groups;
}

const groups = getGroupsFromInput(INPUT);
const yesForGroups = countUniqueYesForGroups(groups);
const result = countTotalYes(yesForGroups);

console.log(result);