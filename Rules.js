class Rules {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
    }

    determineWinner(playerMoveIndex, computerMoveIndex) {
        if (playerMoveIndex === computerMoveIndex) {
            return 'Draw';
        }

        const half = Math.floor(this.numMoves / 2);
        const distance = (computerMoveIndex - playerMoveIndex + this.numMoves) % this.numMoves;

        if (distance <= half) {
            return 'Computer Wins';
        } else {
            return 'Player Wins';
        }
    }
}

module.exports = Rules;
