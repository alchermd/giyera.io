import { useState } from "react";
import { useHistory } from "react-router-dom";

function Lobby() {
    const [roomNumber, setRoomNumber] = useState(0);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        history.push("/room/" + roomNumber);
    }

    function handleChange(e) {
        setRoomNumber(e.target.value);
    }

    return (
        <div className="container mt-5 content">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="text-center">
                        <h2>What room would you like to enter?</h2>

                        <form className="form-subscribe" id="contactForm" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-lg" id="roomNumber" type="number" placeholder="Room number" required value={roomNumber} onChange={handleChange} />
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


export default Lobby;