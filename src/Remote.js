import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import './Remote.scss';
import outline from './logo_beer_no_inside.svg'
import beer from './logo_beer_nosides.svg'

let ws = null;

const SmallBeer = props => {
    return (
        <div className="result-beer-parent">
          <img src={outline} alt='Beer' className={"result-beer outline"}/>
          <img src={beer} alt='Beer' className={"result-beer inside"}
               style={{opacity: props.display ? 1 : 0}}/>
        </div>
    );
};

const ResultDisplay = props => {
    const curResult = Math.min(props.result, Math.pow(2, props.players) - 1);
    const result = curResult.toString(2).padStart(props.players, "0");

    let key = 0;
    const beers = result.split('').map(num => {
        return <SmallBeer key={key++} display={num === "1"}/>
    });

    return (
        <div className="result-container">{beers}</div>
    );
}

const Remote = props => {
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(16);
    const [players, setPlayers] = useState(4);
    const [readyState, setReadyState] = useState(-1);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (ws !== null) {
            return;
        }

        let protocol = 'wss';
        if (window.location.protocol === 'http:') {
            protocol = 'ws';
        }
        ws = new WebSocket(protocol + '://' + window.location.host + '/remote');

        // check websocket ready state every 0.5 seconds
        setInterval(() => {
            if (ws.readyState !== readyState) {
                setReadyState(ws.readyState);
            }
        }, 500);

        ws.onerror = err => console.log(err);
        ws.onopen = () => {
            ws.send("IDENT " + props.match.params.handle);
        }

        ws.onmessage = e => {
            const command = e.data.split(' ');

            switch (command[0]) {
                case 'FINISHED':
                    setRunning(false);
                    setResult(parseInt(command[1]));
                    break;
                case 'IDENT-FAIL':
                    console.log(command[1]);
                    setFailed(true);
                    break;
                case 'IDENT-SUCCESS':
                    ws.send('PING');
                    break;
                case 'PONG':
                    setTimeout(() => ws.send('PING'), 15000);
                    break;
                default:
                    console.log("Unknown command", command);
            }
        }
    }, [readyState, props.match.params.handle]);

    const startPlaying = (players, difficulty) => {
        ws.send("START " + players + " " + difficulty);
        setRunning(true);
        setResult(Math.pow(2, players));
    }

    const changePlayers = players => {
        ws.send("PLAYERS " + players);
        setPlayers(players);
        setResult(Math.pow(2, players));
    }

    if (readyState < 1) {
        return (
            <div className="Remote">
              <header className="Remote-header">Waiting for connection...</header>
            </div>
        );
    }
    if (failed) {
        return (
            <div className="Remote">
              <header className="Remote-header">
                <p>
                  Invalid ident. Connection failed.
                </p>
              </header>
            </div>
        );
    }
    if (readyState !== 1) {
        return (
            <div className="Remote">
              <header className="Remote-header">
                <p>
                  Disconnected
                </p>
                <p>
                  Please <button className="link" onClick={() => window.location.reload()}>refresh</button> to reconnect.
                </p>
              </header>
            </div>
        );
    }

    return (
        <div className="Remote">
          <header className="Remote-header">
          <ResultDisplay players={players} result={result}/>
          <Controls
            display={!running}
            onChangePlayers={changePlayers}
            onStart={startPlaying}/>
          </header>
        </div>
    );
}

export default Remote;
