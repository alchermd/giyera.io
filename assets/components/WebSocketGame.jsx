import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { setColorToSetup, setHiddenColor, setShowCoordinates, toggleColorToMove, toggleShowBoard, setNumberMode, setActiveTab } from "../features/game/gameSlice";
import Board from "./Board";
import Captures from "./Captures";
import './Game.scss';
import Help from "./Help";
import { getCookie } from "./helpers";


function WebSocketGame() {
    axios.get(`${process.env.REACT_APP_API_ROOT}ping/`);

    const { gameCode } = useParams();

    const gameSocket = useRef(new WebSocket(`${process.env.REACT_APP_WS_ROOT}game/${gameCode}/`));

    const [gameStatus, setGameStatus] = useState("WAITING");
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        gameSocket.current.onmessage = function (e) {
            const data = JSON.parse(e.data);
            if (data.type === "USER_JOIN") {
                setGameStatus(data.status);
                setPlayers(data.players);
            }
        }

        gameSocket.current.onclose = function (e) {
            console.error(e);
            Swal.fire({
                title: "Oops...",
                text: "Connection has been closed.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        gameSocket.current.onopen = function (e) {
            gameSocket.current.send(JSON.stringify({
                type: "JOIN",
            }));
        }
    })


    const winner = useSelector(state => state.game.winner);
    const colorToMove = useSelector(state => state.game.colorToMove);
    const colorToSetup = useSelector(state => state.game.colorToSetup);
    const showCoordinates = useSelector(state => state.game.showCoordinates);
    const show = useSelector(state => state.game.board.show);
    const activeTab = useSelector(state => state.game.activeTab);
    const dispatch = useDispatch();

    const status = winner ? `${winner} has won!` : (colorToMove ? `${colorToMove} to move...` : `${colorToSetup} to set board...`);

    const panes = (
        <>
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
                        <p className="card-header text-center">
                            Room Code: <code>{gameCode}</code> <br />
                            Status: {status} <br />
                            <strong>You play as {getCookie("player_id") === players[0] ? "WHITE": "BLACK"}</strong>
                        </p>
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
        </>
    );


    const waitingInfo = (
        <>
            <div className="pane col-8 mt-6 offset-2">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Still waiting for the other player.</h2>
                        </div>
                        <div className="card-body text-center">
                            <p className="lead">Copy this game code and send it your friend!</p>
                            <p className="h1"><code>{gameCode}</code></p>
                            <hr />
                            <p>
                                Or send this game link: <br />
                                <a href={"/" + gameCode}>{window.location.origin + "/" + gameCode}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="container-fluid">
            <div className="row d-flex">
                {gameStatus === "READY" ? panes : waitingInfo}
            </div>
        </div>
    );
}

export default WebSocketGame;