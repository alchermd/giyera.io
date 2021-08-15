import { useState } from "react";
import { useHistory } from "react-router-dom";

function GameLobby() {
    const [roomCode, setRoomCode] = useState("");
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        history.push("/" + roomCode);
    }

    function handleChange(e) {
        setRoomCode(e.target.value);
    }

    function createNewRoom() {
        history.push("/" + Math.random().toString(36).toUpperCase().substr(2, 7));
    }

    return (
        <div className="container mt-5 content">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="text-center">
                        <h2>Create a new Game</h2>

                        <button className="btn btn-primary btn-sm" onClick={createNewRoom}>+ Room Code</button>

                        <hr />

                        <h2>Or enter a Room Code</h2>
                        <form className="form-subscribe" id="contactForm" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-lg" id="roomCode" type="text" placeholder="Room code" required value={roomCode} onChange={handleChange} />
                                </div>
                                <div className="col-auto"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GameLobby;