import React, { useEffect } from 'react';
import Controls from './Controls';

let ws = null;


const Remote = props => {
    useEffect(() => {
        if (ws !== null) {
            return;
        }

        ws = new WebSocket('ws://localhost:5000/remote');

        ws.onerror = err => console.log(err);
        ws.onopen = () => ws.send("IDENT " + props.match.params.handle);

        ws.onmessage = e => {
            const command = e.data.split(' ');
            console.log(command);
        }
    })

    return (
        <div className="App">
          <header className="App-header">
          <Controls
            display={true}
            onChangePlayers={players => ws.send("PLAYERS " + players)}
            onStart={(players, difficulty) => ws.send("START " + players + " " + difficulty)}/>
          </header>
        </div>
    );
}

export default Remote;
