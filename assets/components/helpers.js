import Piece from "./Piece";

export function makePiece(piece, x, y, canDrag) {
    if (!piece) return null;
    return <Piece key={"" + x + y} piece={piece} x={x} y={y} canDrag={canDrag} />
}

export function getReadableCoordinates(i, j) {
    return `${String.fromCharCode(j + 1 + 64)}${i + 1}`;
}

export function getRawCoordinates(coordinates) {
    return [coordinates[1] - 1, coordinates.charCodeAt(0) - 65];
}

export function setPieceColor(piece, color) {
    return { ...piece, color }
}

export function determineWinner(attacker, defender) {
    // Empty square
    if (!defender) {
        return attacker;
    }

    // Draw if same rank
    if (attacker.rank === defender.rank) {
        // Except for flags, the attacker wins
        if (attacker.rank === 0) {
            return attacker;
        }

        return null;
    }

    // Flag automatically wins except against Privates
    if (attacker.rank === -1) {
        if (defender.rank !== 1) {
            return attacker;
        }
        return defender;
    }

    if (defender.rank === -1) {
        if (attacker.rank !== 1) {
            return defender;
        }

        return attacker;
    }


    // Attacker wins
    if (attacker.rank > defender.rank) {
        return attacker
    }

    // Defender wins
    if (attacker.rank < defender.rank) {
        return defender;
    }
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}