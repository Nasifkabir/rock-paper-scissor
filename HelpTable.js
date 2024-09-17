class HelpTable {
    constructor(moves) {
        this.moves = moves;
        this.size = moves.length;
    }

    // Generate the help-table
    generateTable() {
        const headers = ['PC\\User', ...this.moves];
        const rows = this.moves.map((move, i) => {
            const row = [move];
            for (let j = 0; j < this.size; j++) {
                if (i === j) {
                    row.push('Draw');
                } else if ((i - j + this.size) % this.size < (this.size / 2)) {
                    row.push('Win');
                } else {
                    row.push('Lose');
                }
            }
            return row;
        });

        // Calculate column widths
        const columnWidths = headers.map((header, i) => Math.max(header.length, ...rows.map(row => row[i].length)) + 2);

        // Function to format a row with proper alignment
        const formatRow = (row) => row.map((cell, i) => cell.padEnd(columnWidths[i])).join('');

        // Print the table
        const separator = columnWidths.map(width => '-'.repeat(width)).join('+');
        console.log('+' + separator + '+');
        console.log('|' + formatRow(headers) + '|');
        console.log('+' + separator + '+');
        rows.forEach(row => {
            console.log('|' + formatRow(row) + '|');
        });
        console.log('+' + separator + '+');
    }
}

module.exports = HelpTable;
