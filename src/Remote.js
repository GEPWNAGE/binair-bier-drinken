import React, { useEffect } from 'react';
import Controls from './Controls';

let ws = null;


const Remote = props => {
    console.log(props.match.params.handle);

    useEffect(() => {
        if (ws !== null) {
            return;
        }

        ws = new WebSocket('ws://localhost:5000/remote');

        //ws.onmessage(msg => console.log(msg));
        console.log(ws);
        ws.onerror = err => console.log(err);
        ws.onopen = () => ws.send("IDENT " + props.match.params.handle);
    })

    return (
        <div>
          <Controls
            display={true}
            onChangePlayers={players => ws.send("PLAYERS " + players)}
            onStart={(players, difficulty) => ws.send("START " + players + " " + difficulty)}/>
        </div>
    );
}

export default Remote;
