import { PieceTypes } from "./Constants";

function Help() {
    return (
        <>
            <h4>Win Conditions</h4>
            <p>
                You win by either capturing the enemy <strong>Flag</strong> or moving your own <strong>Flag</strong> to the <u>opponent's last rank</u>.
            </p>
            <h4>Piece Strength</h4>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Strength</th>
                        <th>Note</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(PieceTypes).map(type => (
                        <tr key={type}>
                            <td className="piece-name">{type}</td>
                            <td className="piece-rank">{PieceTypes[type].rank}</td>
                            <td><small>{PieceTypes[type].helpText}</small></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <small>You can also enable <strong>Number Mode</strong> below to display the piece's strength instead of their normal name.</small>

            <h4>Special Rules</h4>
            <ul>
                <li>You cannot place pieces on the 4th and 5th ranks in your initial formation.</li>
                <li>When a Flag attacks another Flag, the attacking Flag wins.</li>
                <li>When a Flag reaches the last rank, it <strong>must not be captured on the next move</strong> in order for it to count as a win.</li>
            </ul>
        </>
    );
}

export default Help;