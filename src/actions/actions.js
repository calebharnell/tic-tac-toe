export function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let index = 0; index < winningCombinations.length; index++) {
    const [a, b, c] = winningCombinations[index]
    // Loop through each winning combination
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    // If all values of a winning combination are the same,
    // Return the value of the winning player
    // Otherwise in Board.js { const playerWins = null } and game continues
  }
  return null
}

export function checkBoardIsFull(squares) {
  return squares.includes(null) ? false : true
  // Only return true if there are no 'null' items in array
}