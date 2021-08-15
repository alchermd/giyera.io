import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ItemTypes } from './Constants';
import { getReadableCoordinates } from './helpers';
import './Piece.scss'

function Piece({ piece, x, y, canDrag }) {
    const colorToMove = useSelector(state => state.game.colorToMove);
    const colorToSetup = useSelector(state => state.game.colorToSetup);
    const hiddenColor = useSelector(state => state.game.hiddenColor);
    const winner = useSelector(state => state.game.winner);
    const numberMode = useSelector(state => state.game.numberMode);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PIECE,
        canDrag() {
            return canDrag;
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
            canDrag: !!monitor.canDrag(),
        }),
        item: { piece, src: getReadableCoordinates(x, y) }
    }), [piece, x, y, canDrag,]);
    
    if (piece.color === hiddenColor) {
        return null;
    }

    return (
        <div className={"piece " + piece.color}
            style={{
                opacity: isDragging ? 0.5 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
            }}
            ref={drag}>
            {/* Display piece name only when it's that color's piece turn to move or when to game is over. */}
            {(winner || [colorToMove, colorToSetup].includes(piece.color)) && <span>{numberMode ? piece.numberModeName : piece.shortName}</span>}
        </div>
    );
}


export default Piece;