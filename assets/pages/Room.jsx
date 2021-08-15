import { useRef } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";


function Room() {
    const { roomNumber } = useParams();
    const history = useHistory();
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState("");
    const chatSocket = useRef(new WebSocket(`${process.env.REACT_APP_WS_ROOT}chat/${roomNumber}/`));

    chatSocket.current.onmessage = function (e) {
        const data = JSON.parse(e.data);
        setChatLog([...chatLog, data.message]);
    }

    chatSocket.current.onclose = function (e) {
        console.error(e);
        Swal.fire({
            title: "Oops...",
            text: "Connection has been closed.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        chatSocket.current.send(JSON.stringify({
            message,
        }))
        setMessage("");
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    return (
        <div className="container mt-5 content">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="text-center">
                        <button className="btn btn-outline-secondary" onClick={() => history.goBack()}>Back</button>
                        <h1>This is room #{roomNumber}</h1>
                        <ul>
                            {chatLog.map((log, index) => <li key={index}>{log}</li>)}
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <textarea className="form-control form-control-lg" id="message" placeholder="Type your message here" required value={message} onChange={handleChange} />
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

export default Room;