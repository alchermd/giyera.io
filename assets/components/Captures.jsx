import { useSelector } from "react-redux";
import CapturedPiece from "./CapturedPiece";

function Captures() {
    const capturedPieces = useSelector(state => state.game.capturedPieces);

    function makeCapturedPiece(piece, i) {
        return <CapturedPiece key={piece.rank + piece.color + i} piece={piece} />;
    }

    return (
        <>
            <h4>Captured Pieces</h4>
            <div className="captured-pieces-container">
                {capturedPieces
                    .filter(piece => piece.color === "BLACK")
                    .map(makeCapturedPiece)}
            </div>
            <hr />
            <div className="captured-pieces-container">
                {capturedPieces
                    .filter(piece => piece.color === "WHITE")
                    .map(makeCapturedPiece)}
            </div>
        </>
    );
}

export default Captures;