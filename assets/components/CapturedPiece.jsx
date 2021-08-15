import { useSelector } from "react-redux";

function CapturedPiece({ piece }) {
    const numberMode = useSelector(state => state.game.numberMode);
    const colorToMove = useSelector(state => state.game.colorToMove);
    const show = useSelector(state => state.game.board.show);

    let displayName = "???";
    if (show && colorToMove === piece.color) {
        if (numberMode) {
            displayName = piece.numberModeName;
        } else {
            displayName = piece.shortName;
        }
    }

    return (
        <div className={"piece captured-piece " + piece.color}>
            <span>{displayName}</span>
        </div>
    );
}

export default CapturedPiece;