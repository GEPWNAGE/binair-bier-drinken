import React, { useEffect } from 'react';

let ws = null;

const Start = props => {
    return <button onClick={props.onStart}>test</button>
}

const Players = props => {
    return <button onClick={props.onPlayers}>players</button>
}

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
          <Start onStart={() => ws.send("START 4 50")}/>
          <Players onPlayers={() => ws.send("PLAYERS 5")}/>
        </div>
    );
}

export default Remote;
