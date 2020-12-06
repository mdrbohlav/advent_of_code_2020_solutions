const readInput = require("./read_input");

const INPUT = readInput("06_input.txt", { includeEmptyLines: true });

function countTotalYes(yesForGroups) {
  return yesForGroups.reduce((t, n) => t + n, 0);
}

function countYesForGroups(groups) {
  return groups.map(g => g.length);
}

function sortGroupParticipantsFromShortest(group) {
  return group.sort((a, b) => a.length - b.length);
}

function filterOnlyCommonAnswers(group) {
  group = sortGroupParticipantsFromShortest(group);

  return group.shift().filter((answer) => {
    return group.every((g) => g.indexOf(answer) !== -1);
  });
}

function filterOnlyCommonAnswersPerGroup(groups) {
  groups = groups.map(group => filterOnlyCommonAnswers(group));

  return groups;
}

function getGroupsFromInput(input) {
  const groups = [];

  input.forEach((line, index) => {
    if (line !== "") {
      let groupIndex = groups.length - 1;

      if (groups.length === 0) {
        groupIndex = 0;
      } else if (input[index - 1] === "") {
        groupIndex = groups.length;
      }

      const group = line.split("");

      if (groupIndex >= groups.length) {
        groups.push([]);
      }

      groups[groupIndex].push(group);
    }
  });

  return groups;
}

const groups = getGroupsFromInput(INPUT);
const onlyCommonAnswersPerGroup = filterOnlyCommonAnswersPerGroup(groups);
const yesForGroups = countYesForGroups(onlyCommonAnswersPerGroup);
const result = countTotalYes(yesForGroups);

console.log(result);
