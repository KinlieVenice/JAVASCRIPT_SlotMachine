// Give the user their winning
// Play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

// Deposit some money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); //converts the string input to number

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.error("Invalid deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

// let balance = deposit();

// Determine number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt(
      "Enter the number of lines you want to bet on between 1-3: "
    );
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.error("Invalid line, try again.");
    } else {
      return numberOfLines;
    }
  }
};

// let lines = getNumberOfLines();

// Collect a bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt(
      `Enter your bet per line, must be within $${(balance / lines).toFixed(
        2
      )} based on your balance: `
    );
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.error(
        `Invalid bet. Bet must be within ${balance / lines}, try again.`
      );
    } else {
      return numberBet;
    }
  }
};

// let bet = getBet(balance, lines);

// Spin the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// const reels = spin();

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);

    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// const rows = transpose(reels);

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";

    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// const styled = printRows(rows);

// Check if the user won
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = 0;
  let playAgain = "y";

  while (true) {
    if (playAgain == "y") {
      if (balance == 0) balance = deposit();

      console.log(`You have a balance of ${balance}`);
      let lines = getNumberOfLines();
      let bet = getBet(balance, lines);
      balance -= bet * lines;
      const reels = spin();
      const rows = transpose(reels);
      const styled = printRows(rows);
      const winnings = getWinnings(rows, bet, lines);
      balance += winnings;
      if (winnings > 0) {
        console.log(`Congratulations! You won $${winnings}!`);
      } else {
        console.log(`You lose! Better luck next time`);
      }

      if (balance == 0) console.log("You ran out of money!");
    } else if (playAgain == "n") {
      break;
    }

    playAgain = prompt("Do you want to play again? (y/n) ").toLowerCase();
  }
};

game();
