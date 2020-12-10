const readInput = require('../read_input');

const INPUT = readInput('04/input.txt', { includeEmptyLines: true });
const REQUIRED_FIELDS = {
  byr: true,
  iyr: true,
  eyr: true,
  hgt: true,
  hcl: true,
  ecl: true,
  pid: true,
  cid: false,
};

function isPassportValid(passport, requirements) {
  const reqirementsKeys = Object.keys(requirements);
  const isValid = reqirementsKeys.every(key => {
    const required = requirements[key];

    if (!required || passport[key]) {
      return true;
    }

    return false;
  });

  return isValid;
}

function countValidPassports(passports, requirements) {
  return passports.reduce((t, p) => {
    if (isPassportValid(p, requirements)) {
      return t + 1;
    }

    return t;
  }, 0);
}

function parsePassportData(data) {
  let properties = data.split(/\s/);
  properties = properties.map(p => p.split(':'));
  properties = properties.reduce((obj, p) => {
    obj[p[0]] = p[1];
    return obj;
  }, {});

  return properties;
}

function getPassportsFromInput(input) {
  const passports = [];

  input.forEach((line, index) => {
    if (line !== '') {
      let passportIndex = passports.length - 1;

      if (passports.length === 0) {
        passportIndex = 0;
      } else if (input[index - 1] === '') {
        passportIndex = passports.length;
      }

      const passport = parsePassportData(line);

      if (passportIndex >= passport.length) {
        passports.push(passport);
      } else {
        passports[passportIndex] = {
          ...passports[passportIndex],
          ...passport,
        };
      }
    }
  });

  return passports;
}

const passports = getPassportsFromInput(INPUT);
const validPassports = countValidPassports(passports, REQUIRED_FIELDS);

console.log(validPassports);
