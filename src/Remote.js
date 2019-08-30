import React, { useEffect } from 'react';

let started = false;

const Remote = props => {
    console.log(props.match.params.handle);

    useEffect(() => {
        if (started) {
            return;
        }

        const ws = new WebSocket('ws://localhost:5000/remote');
        started = true;

        //ws.onmessage(msg => console.log(msg));
        console.log(ws);
        ws.onerror = err => console.log(err);
        ws.onopen = e => { ws.send("IDENT " + props.match.params.handle); };
    })



    return <div>Empty</div>;
}

export default Remote;
