const readInput = require('./read_input');

const INPUT = readInput('05_input.txt');
const ROWS = 127;
const COLUMNS = 7;

function parsePos(from, to, lowerMove, upperMove, id) {
  const move = id[0];

  if (move === lowerMove) {
    to = Math.floor((from + to) / 2);

    if (id.length === 1) {
      return to;
    }
  } else if (move === upperMove) {
    from = Math.ceil((from + to) / 2);

    if (id.length === 1) {
      return from;
    }
  }

  return parsePos(from, to, lowerMove, upperMove, id.substr(1));
}

function parseCol(from, to, id) {
  return parsePos(from, to, 'L', 'R', id);
}

function parseRow(from, to, id) {
  return parsePos(from, to, 'F', 'B', id);
}

function orderedSeatsIds(seats) {
  return seats.map(s => (s.row * 8 + s.col)).sort((a, b) => (a - b));
}

function getMissingSeatFromArray(seatsIds) {
  for (let i = seatsIds[0]; i <= seatsIds[seatsIds.length - 1]; i++) {
    const seatExists = seatsIds.indexOf(i) > -1;

    if (!seatExists) {
      return i;
    }
  }

  return null;
}

function seatPosition(totalRows, totalColumns, seat) {
  const rowId = seat.substr(0, 7);
  const colId = seat.substr(7);
  const row = parseRow(0, totalRows, rowId);
  const col = parseCol(0,  totalColumns, colId);

  return { row, col };
}

function seatsPosition(totalRows, totalColumns, input) {
  return input.map(s => seatPosition(totalRows, totalColumns, s));
}

const seats = seatsPosition(ROWS, COLUMNS, INPUT);
const seatsIds = orderedSeatsIds(seats);
const result = getMissingSeatFromArray(seatsIds);

console.log(result);
