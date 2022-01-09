import React, {useEffect, useState} from 'react';

interface Player {
    id: string,
    name: string,
}

export default function Admin() {
    const [playor, setPlayer] = useState("");
    const [score, setScore] = useState("");
    const [message, setMessage] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
    
    const selectPlayer = (players: HTMLSelectElement) => {
        setSelectedPlayer({
            id: players.value,
            name: players.options[players.selectedIndex].text
        });
    }

    const addScore = () => {
        const scoreEntry = {
            playerId: playor,
            score: score
        }

        fetch("/.netlify/functions/addScore",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(scoreEntry)
            })
            .then(function(res){
                setMessage(`Leaderboard score of ${score} added for player ${playor}`);
            })
            .catch(function(res){
                setMessage(`Unable to add score for player ${playor}`);
            })
    }

    return <>
        <h2>Admin</h2>
        <h4>Add a Leaderboard Entry</h4>
        {
            <div className="mb-3 score-entry">
                <label>Player</label>
                <input type="text"
                       className="form-control"
                       aria-label="score entry"
                       value={playor}
                       onChange={e => setPlayer(e.target.value)}/>
            </div>            
            <div className="mb-3 score-entry">
                <label>Score</label>
                <input type="text"
                       className="form-control"
                       aria-label="score entry"
                       value={score}
                       onChange={e => setScore(e.target.value)}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={addScore}>Add Score</button>
            </div>
            </>
        }
        <div className="admin-message">{message}</div>
    </>
}
