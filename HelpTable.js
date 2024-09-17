class HelpTable {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
    }

    generateTable() {
        // Generate the top header row with PC's move names
        let headerRow = '+-------------+';
        let titleRow = '| PC\\User     |';

        this.moves.forEach(move => {
            const movePadded = move.padEnd(10, ' ');  // Padding for consistency
            headerRow += '------------+';
            titleRow += ` ${movePadded}|`;
        });

        // Print the top rows (PC's moves)
        console.log(headerRow);
        console.log(titleRow);
        console.log(headerRow);

        // Loop through each user move (rows) to generate the results against PC moves
        for (let i = 0; i < this.numMoves; i++) {
            let row = `| ${this.moves[i].padEnd(11, ' ')}|`;  // User move row

            for (let j = 0; j < this.numMoves; j++) {
                if (i === j) {
                    row += ' Draw       |';  // Same move = Draw
                } else if (
                    (j > i && j - i <= this.numMoves / 2) || 
                    (j < i && i - j > this.numMoves / 2)
                ) {
                    row += ' Win        |';  // Winning condition
                } else {
                    row += ' Lose       |';  // Losing condition
                }
            }

            console.log(row);  // Print user move row
            console.log(headerRow);  // Print separator after each row
        }
    }
}

module.exports = HelpTable;
