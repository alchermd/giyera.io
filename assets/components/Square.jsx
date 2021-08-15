import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { checkIfLastRankFlagWins, movePiece, toggleColorToMove, toggleShowBoard } from '../features/game/gameSlice';
import { ItemTypes } from './Constants';
import { getReadableCoordinates, makePiece } from './helpers';
import Overlay from './Overlay';
import './Square.scss'


function Square({ x, y, piece, showCoordinates, isSquareDroppable, show }) {
    const coordinates = getReadableCoordinates(x, y);
    const coordinatesElement = showCoordinates ? <span>{coordinates}</span> : null;

    const dispatch = useDispatch();
    const colorToSetup = useSelector(state => state.game.colorToSetup);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.PIECE,
        drop: (item) => {
            const dest = coordinates;
            const src = item.src;

            dispatch(movePiece({ dest, src, piece: item.piece }));
            if (colorToSetup === null) {
                setTimeout(() => {
                    dispatch(toggleColorToMove());
                    dispatch(checkIfLastRankFlagWins());
                    dispatch(toggleShowBoard());
                }, 1000);
            }
            else {
                dispatch(toggleColorToMove());
                dispatch(checkIfLastRankFlagWins());
            }
        },
        canDrop: (item) => isSquareDroppable(x, y, item.src, item.piece),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [x, y, isSquareDroppable,]);

    // Workaround to work for Chrome
    // See https://github.com/react-dnd/react-dnd/issues/1476#issuecomment-654842903
    const [canDropDelayed, setCanDropDelayed] = useState(false);
    useEffect(() => {
        setTimeout(() => setCanDropDelayed(canDrop), 0);
    }, [canDrop]);

    const colorToMove = useSelector(state => state.game.colorToMove);
    const winner = useSelector(state => state.game.winner);
    const lastMoveSrc = useSelector(state => state.game.lastMoveSrc);
    const lastMoveDest = useSelector(state => state.game.lastMoveDest);

    const overlays = (
        show &&
        <>
            {isOver && !canDropDelayed && <Overlay color="red" />}
            {!isOver && canDropDelayed && <Overlay color="yellow" />}
            {isOver && canDropDelayed && <Overlay color="green" />}
            {lastMoveSrc === getReadableCoordinates(x, y) && colorToMove !== null && <Overlay color="#7d6608" />}
            {lastMoveDest === getReadableCoordinates(x, y) && colorToMove !== null && <Overlay color="#7d6608" />}
        </>
    );

    return (
        <div ref={drop} className="square-container">
            <div className="square">
                {coordinatesElement}
                {show && makePiece(
                    piece,
                    x,
                    y,
                    (winner === null && piece?.color === colorToMove) || (piece?.color === colorToSetup),
                )}
            </div>

            {overlays}
        </div>
    );
}

export default Square;