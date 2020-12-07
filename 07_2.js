const readInput = require("./read_input");

const INPUT = readInput("07_input.txt");
const REQUIRED_BAG = "shiny gold";

function countBagsInside(bags, color) {
  let result = 0;

  if (!bags[color]) {
    return result;
  }

  bags[color].forEach(innerBag => {
    const innerBagColor = innerBag[0];
    const innerBagCount = innerBag[1];

    result += innerBagCount + innerBagCount * countBagsInside(bags, innerBagColor);
  });

  return result;
}

function parseBagCountAndColor(bag) {
  bag = bag.replace(/bags?/, '');

  const color = bag.replace(/[\d.]/g, '').trim();
  const count = parseInt(bag.replace(/[^\d]/g, '').trim(), 10);

  if (color === 'no other') {
    return null;
  }

  return [color, count];
}

function parseOuterBagAndContent(line) {
  const parts = line.split("contain");
  const outerBag = parseBagCountAndColor(parts[0])[0];
  const innerBags = parts[1].split(",").map((b) => parseBagCountAndColor(b));

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
const caryingBagsCount = countBagsInside(bagsWithContent, REQUIRED_BAG);

console.log(caryingBagsCount);
