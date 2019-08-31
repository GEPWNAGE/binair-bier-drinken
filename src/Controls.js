import React, { useState } from 'react';
import './Controls.scss';

const Controls = props => {
    const [players, setPlayers] = useState(4);
    const [difficulty, setDifficulty] = useState(50);

    const changePlayers = num => {
        if (num < 1) {
            return;
        }
        setPlayers(num);
        props.onChangePlayers(num);
    }

    const changeDifficulty = num => {
        if (num > 100 || num < 0) {
            return;
        }
        setDifficulty(num);
    }

    return (
        <div className='ui' style={{opacity: props.display ? 1 : 0}}>
          <p>
            Players:
            <button onClick={() => changePlayers(players - 1)}>-</button>
              {players}
            <button onClick={() => changePlayers(players + 1)}>+</button>
          </p>
          <p>
            Difficulty:
            <button onClick={() => changeDifficulty(difficulty - 5)}>-</button>
            {difficulty}
            <button onClick={() => changeDifficulty(difficulty + 5)}>+</button>
          </p>
          <p>
            <button onClick={() => props.onStart(players, difficulty)}>Start</button>
          </p>
        </div>
    );
};

export default Controls;
