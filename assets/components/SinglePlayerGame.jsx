import { useDispatch, useSelector } from "react-redux";
import { setColorToSetup, setHiddenColor, setShowCoordinates, toggleColorToMove, toggleShowBoard, setNumberMode, setActiveTab } from "../features/game/gameSlice";
import Board from "./Board";
import Captures from "./Captures";
import './Game.scss';
import Help from "./Help";


function SingleScreenGame() {
    const winner = useSelector(state => state.game.winner);
    const colorToMove = useSelector(state => state.game.colorToMove);
    const colorToSetup = useSelector(state => state.game.colorToSetup);
    const showCoordinates = useSelector(state => state.game.showCoordinates);
    const show = useSelector(state => state.game.board.show);
    const activeTab = useSelector(state => state.game.activeTab);
    const dispatch = useDispatch();

    const status = winner ? `${winner} has won!` : (colorToMove ? `${colorToMove} to move...` : `${colorToSetup} to set board...`);

    return (
        <div className="container-fluid">
            <div className="row d-flex">
                <div className="pane d-flex col-xl-4 col-md-12 order-xl-2">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <Board showCoordinates={showCoordinates} />
                    </div>
                </div>

                <div className="pane col-xl-4 col-md-4 order-xl-1 order-md-3 sidepane">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        {winner === null && colorToSetup === "WHITE" ? <button className="setup-button btn btn-outline-secondary" disabled={!show} onClick={() => {
                            dispatch(setColorToSetup({ color: "BLACK" }));
                            dispatch(toggleShowBoard());
                            dispatch(setHiddenColor({ color: "WHITE" }));
                        }}>✓ White is ready</button> : null}

                        {winner === null && colorToSetup === "BLACK" ? <button className="setup-button btn btn-outline-dark" disabled={!show} onClick={() => {
                            dispatch(setColorToSetup({ color: null }));
                            dispatch(toggleColorToMove({ colorToMove: null }))
                            dispatch(toggleShowBoard());
                            dispatch(setHiddenColor({ color: null }));
                        }}>✓ Black is ready</button> : null}
                    </div>
                </div>


                <div className="pane sidepane col-xl-4 col-md-8 order-xl-3 order-md-2">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className="card">
                            <p className="card-header text-center">Status: {status}</p>
                            <div className="card-body">
                                <div className="btn-group">
                                    <button className="btn btn-primary" onClick={() => dispatch(setActiveTab({ activeTab: "HELP" }))}>Show Help</button>
                                    <button className="btn btn-secondary" onClick={() => dispatch(setActiveTab({ activeTab: "CAPTURES" }))}>Captures</button>
                                </div>
                                <hr />
                                {activeTab === "HELP" && <Help />}
                                {activeTab === "CAPTURES" && <Captures />}
                            </div>

                            <div className="card-footer text-center d-flex align-items-center">
                                <button className="btn btn-secondary" onClick={() => dispatch(toggleShowBoard())} disabled={show}>Unhide</button>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="showCoordinates" id="showCoordinates" onChange={e => dispatch(setShowCoordinates({ showCoordinates: e.target.checked }))} />
                                    <label htmlFor="showCoordinates" className="form-check-label">Show Coordinates</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="numberMode" id="numberMode" onChange={e => dispatch(setNumberMode({ numberMode: e.target.checked }))} />
                                    <label htmlFor="numberMode" className="form-check-label">Number Mode</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleScreenGame;