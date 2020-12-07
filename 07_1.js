const readInput = require("./read_input");

const INPUT = readInput("07_input.txt");
const REQUIRED_BAG = "shiny gold";

function getOuterBags(outerBags, innerBagColor) {
  const outerBagsColors = Object.keys(outerBags);
  let result = [];

  outerBagsColors.forEach(outerBagColor => {
    if (outerBags[outerBagColor] && outerBags[outerBagColor].indexOf(innerBagColor) > -1) {
      delete outerBags[outerBagColor];

      result = [...result, outerBagColor, ...getOuterBags(outerBags, outerBagColor)];
    }
  });

  return result;
}

function parseBagColor(bag) {
  bag = bag.replace(/bags?/, '');

  const color = bag.replace(/[\d.]/g, '').trim();

  if (color === 'no other') {
    return null;
  }

  return color;
}

function parseOuterBagAndContent(line) {
  const parts = line.split("contain");
  const outerBag = parseBagColor(parts[0]);
  const innerBags = parts[1].split(",").map((b) => parseBagColor(b));

  if (innerBags.length === 1 && !innerBags[0]) {
    return null;
  }

  return [outerBag, innerBags];
}

function parseBags(input) {
  const result = {};

  input.forEach((line) => {
    const newBag = parseOuterBagAndContent(line);

    if (newBag) {
      if (result[newBag[0]]) {
        result[newBag[0]] = result[newBag[0]].concat(newBag[1]);
      } else {
        result[newBag[0]] = newBag[1];
      }
    }
  });

  return result;
}

const bagsWithContent = parseBags(INPUT);
const possibleCarriedBags = getOuterBags(bagsWithContent, REQUIRED_BAG);
const result = possibleCarriedBags.length;

console.log(result);
