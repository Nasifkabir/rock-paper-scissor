const readline = require('readline');
const HMACGenerator = require('./HMACGenerator');
const KeyGenerator = require('./KeyGenerator');
const Rules = require('./Rules');
const HelpTable = require('./HelpTable');

const args = process.argv.slice(2);

// Validate the number of arguments
if (args.length < 3 || args.length % 2 === 0) {
    console.log('Error: You must provide an odd number of moves greater than or equal to 3.');
    console.log('Example: node game.js Rock Paper Scissors');
    process.exit(1);
}

const moves = args;  // We no longer need the --help check here, as help is in the menu.

const key = KeyGenerator.generateKey();
const computerMoveIndex = Math.floor(Math.random() * moves.length);
const computerMove = moves[computerMoveIndex];
const hmac = HMACGenerator.generateHMAC(key, computerMove);

console.log(`HMAC: ${hmac}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menu with Help option
const menu = () => {
    console.log('Available moves:');
    moves.forEach((move, index) => {
        console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - Exit');
    console.log('h - Help (show table)');
};

// Function to display the help table
const showHelp = () => {
    const helpTable = new HelpTable(moves);
    helpTable.generateTable();
};

// Play the game
const playGame = () => {
    menu();
    rl.question('Enter your move: ', (input) => {
        if (input === '0') {
            console.log('Goodbye!');
            rl.close();
            return;
        } else if (input.toLowerCase() === 'h') {
            showHelp();
            playGame();  // Show the menu again after displaying help
            return;
        }

        const playerMoveIndex = parseInt(input) - 1;
        if (isNaN(playerMoveIndex) || playerMoveIndex < 0 || playerMoveIndex >= moves.length) {
            console.log('Invalid move. Try again.');
            playGame();
            return;
        }

        const playerMove = moves[playerMoveIndex];
        const rules = new Rules(moves);
        const result = rules.determineWinner(playerMoveIndex, computerMoveIndex);

        console.log(`Your move: ${playerMove}`);
        console.log(`Computer move: ${computerMove}`);
        console.log(`Result: ${result}`);
        console.log(`HMAC key: ${key}`);

        rl.close();
    });
};

playGame();
