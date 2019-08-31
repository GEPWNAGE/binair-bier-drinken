import React, { useState, useEffect } from 'react';
import Controls from './Controls';

let ws = null;


const Remote = props => {
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (ws !== null) {
            return;
        }

        ws = new WebSocket('ws://localhost:5000/remote');

        ws.onerror = err => console.log(err);
        ws.onopen = () => {
            ws.send("IDENT " + props.match.params.handle);
        }

        ws.onmessage = e => {
            const command = e.data.split(' ');

            switch (command[0]) {
                case 'FINISHED':
                    setRunning(false);
                    break;
                default:
                    console.log("Unknown command", command);
            }
        }
    });

    const startPlaying = (players, difficulty) => {
        ws.send("START " + players + " " + difficulty);
        setRunning(true);
    }

    return (
        <div className="App">
          <header className="App-header">
          <Controls
            display={!running}
            onChangePlayers={players => ws.send("PLAYERS " + players)}
            onStart={startPlaying}/>
          </header>
        </div>
    );
}

export default Remote;
