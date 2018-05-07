export const getBigSquareIndices = n => {
  const row = Math.floor(n / 3) * 3;
  const col = (n % 3) * 3;
  const startIndex = row * 9 + col;

  let result = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result.push(startIndex + i * 9 + j);
    }
  }
  return result;
};

export const checkForClashes = (board, checkIndex, checkVal) =>
  board.reduce((clashes, num, i) => {
    // check number is the same
    if (board[i] !== checkVal || i === checkIndex) {
      return clashes;
    }
    // check for column
    if (i % 9 === checkIndex % 9) {
      return clashes.concat(i);
    }
    // check for row
    if (Math.floor(i / 9) === Math.floor(checkIndex / 9)) {
      return clashes.concat(i);
    }
    // check for bigSquare
    if (
      // same bigCol && same bigRow
      Math.floor(i / 3) % 3 === Math.floor(checkIndex / 3) % 3 &&
      Math.floor(i / 27) * 9 === Math.floor(checkIndex / 27) * 9
    ) {
      return clashes.concat(i);
    }
    return clashes;
  }, []);
