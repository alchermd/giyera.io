import { useSelector } from 'react-redux';
import './Board.scss';
import { getRawCoordinates, getReadableCoordinates } from "./helpers";
import Square from "./Square";

function Board({ showCoordinates }) {
    const ranks = useSelector((state) => state.game.board.ranks);
    const show = useSelector((state) => state.game.board.show);
    const colorToSetup = useSelector(state => state.game.colorToSetup);

    function isSquareDroppable(x, y, src, piece) {
        // A piece can be setup freely in the player's side of the board when setting up the pieces.
        if (colorToSetup === piece.color) {
            const validForWhite = colorToSetup === "WHITE" && x < 3;
            const validForBlack = colorToSetup === "BLACK" && x > 4;
            return validForWhite || validForBlack;
        }

        else {
            // When game has started, a piece can only move to a square that satisfies both of the following conditions:
            // 1. Is directly above, below, to the left, or to the right of the moving piece
            const [srcX, srcY] = getRawCoordinates(src);
            const adjacentSquares = [
                getReadableCoordinates(srcX + 1, srcY),
                getReadableCoordinates(srcX, srcY + 1),
                getReadableCoordinates(srcX - 1, srcY),
                getReadableCoordinates(srcX, srcY - 1),
            ];

            // 2. Is not occupied by the same color piece
            const targetSquare = ranks[x][y];
            const targetColor = targetSquare.piece ? targetSquare.piece.color : null;
            const isNotSameColor = targetColor !== piece.color;

            return adjacentSquares.includes(getReadableCoordinates(x, y)) && isNotSameColor;
        }
    }

    return (
        <div className="board d-flex flex-column-reverse align-items-center justify-content-center">
            {ranks.map((rank, i) => (
                <div className="rank d-flex" key={"rank-" + i}>
                    {rank.map((square, j) => {
                        const coordinates = getReadableCoordinates(i, j);
                        return (<Square key={coordinates}
                            x={i}
                            y={j}
                            showCoordinates={showCoordinates}
                            piece={square.piece}
                            isSquareDroppable={isSquareDroppable}
                            show={show} />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default Board;