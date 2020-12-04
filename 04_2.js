const readInput = require('./read_input');

const INPUT = readInput('04_input.txt', { includeEmptyLines: true });
const REQUIRED_FIELDS = {
  byr: {
    type: 'digits',
    min: 1920,
    max: 2002,
  },
  iyr: {
    type: 'digits',
    min: 2010,
    max: 2020,
  },
  eyr: {
    type: 'digits',
    min: 2020,
    max: 2030,
  },
  hgt: {
    type: 'digitsWithUnit',
    units: ['cm', 'in'],
    cm: {
      min: 150,
      max: 193,
    },
    in: {
      min: 59,
      max: 76,
    },
  },
  hcl: {
    type: 'hexColor',
  },
  ecl: {
    type: 'enum',
    values: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
  },
  pid: {
    type: 'specificLengthNumber',
    length: 9,
  },
  cid: false,
};

function isDigitsValid(value, requirements) {
  return value >= requirements.min && value <= requirements.max;
}

function isDigitsWithUnitValid(value, requirements) {
  value = value.replace(/\s/g, '');

  const unit = value.replace(/\d/g, '');
  const number = parseInt(value.replace(/[^\d]/, ''), 10);

  for (let i = 0; i < requirements.units.length; i++) {
    if (unit === requirements.units[i]) {
      const range = requirements[requirements.units[i]];
      return number >= range.min && number <= range.max;
    }
  }

  return false;
}

function isHexColorValid(value) {
  return !!value.match(/^#[0-9a-f]{6}$/i);
}

function isEnumValid(value, requirements) {
  return requirements.values.indexOf(value) > -1;
}

function isSpecificLengthNumberValid(value, requirements) {
  const regexp = new RegExp(`^[0-9]{${requirements.length}}$`, 'i')
  return !!value.match(regexp);
}

function isPassportValid(passport, requirements) {
  const reqirementsKeys = Object.keys(requirements);
  const isValid = reqirementsKeys.every(key => {
    const keyRequirements = requirements[key];

    if (!keyRequirements) {
      return true;
    }

    if (!passport[key]) {
      return false;
    }

    if (keyRequirements.type === 'digits') {
      return isDigitsValid(passport[key], keyRequirements);
    }

    if (keyRequirements.type === 'digitsWithUnit') {
      return isDigitsWithUnitValid(passport[key], keyRequirements);
    }

    if (keyRequirements.type === 'hexColor') {
      return isHexColorValid(passport[key]);
    }

    if (keyRequirements.type === 'enum') {
      return isEnumValid(passport[key], keyRequirements);
    }

    if (keyRequirements.type === 'specificLengthNumber') {
      return isSpecificLengthNumberValid(passport[key], keyRequirements);
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

function parsePassportData(data, requirements) {
  let properties = data.split(/\s/);
  properties = properties.map(p => p.split(':'));
  properties = properties.reduce((obj, p) => {
    const key = p[0];
    const value =
      requirements[key] && requirements[key].type === 'digits' ? parseInt(p[1], 10) : p[1];

    obj[key] = value;
    return obj;
  }, {});

  return properties;
}

function getPassportsFromInput(input, requirements) {
  const passports = [];

  input.forEach((line, index) => {
    if (line !== '') {
      let passportIndex = passports.length - 1;

      if (passports.length === 0) {
        passportIndex = 0;
      } else if (input[index - 1] === '') {
        passportIndex = passports.length;
      }

      const passport = parsePassportData(line, requirements);

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

const passports = getPassportsFromInput(INPUT, REQUIRED_FIELDS);
const validPassports = countValidPassports(passports, REQUIRED_FIELDS);

console.log(validPassports);
