import React, { Component } from 'react';
import './App.scss';
import outline from './logo_beer_no_inside.svg'
import beer from './logo_beer_nosides.svg'

function generateRandom(players, difficulty) {
  difficulty = difficulty / 100;

  let num = 0;

  for (let i = 0; i < players; i++) {
    num += (Math.random() > difficulty);
    num *= 2;
  }
  return num / 2;
}

class Counter extends Component {
  render() {
    let finished = this.props.finished ? ' finished' : '';
    return <div className={"counter" + finished}>{this.props.num}</div>;
  }
}

class Beer extends Component {
  render() {
    let height = 40 - 40 * this.props.show;
    let rect = 'rect(' + height + 'vmin, 40vmin, 40vmin, 0)';
    return (
      <div className="beer-parent">
        <img src={outline} alt='Beer' className="beer outline"/>
        <img src={beer} alt='Beer' className="beer inside"
          style={{'clip': rect}}/>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.tick = this.tick.bind(this);
    this.handleDecreasePlayers = this.handleDecreasePlayers.bind(this);
    this.handleIncreasePlayers = this.handleIncreasePlayers.bind(this);
    this.handleDecreaseDiff = this.handleDecreaseDiff.bind(this);
    this.handleIncreaseDiff = this.handleIncreaseDiff.bind(this);

    this.timerHandle = null;

    this.state = {
      running: false,
      time: 16,
      num: 0,
      players: 4,
      difficulty: 50,
      finished: false
    }
  }
  handleStart() {
    this.timerHandle = setInterval(this.tick, 20);
    let num = generateRandom(this.state.players, this.state.difficulty);
    this.setState({
      running: true,
      time: Math.pow(2, this.state.players),
      num: num,
      finished: false
    });
  }
  tick() {
    if (this.state.time - this.state.num <= 0.001) {
      this.setState({running: false, finished: true});
      clearInterval(this.timerHandle);
    }

    let newTime = this.state.time - 0.02;
    this.setState({time: newTime});
  }
  handleIncreasePlayers() {
    this.setState({
      players: this.state.players + 1,
      time: Math.pow(2, this.state.players + 1)
    });
  }
  handleDecreasePlayers() {
    if (this.state.players >= 2) {
      this.setState({
        players: this.state.players - 1,
        time: Math.pow(2, this.state.players - 1)
      });
    }
  }
  handleIncreaseDiff() {
    if (this.state.difficulty <= 99) {
      this.setState({difficulty: this.state.difficulty + 1});
    }
  }
  handleDecreaseDiff() {
    if (this.state.difficulty >= 2) {
      this.setState({difficulty: this.state.difficulty - 1});
    }
  }
  render() {
    let num = Math.round(this.state.time);
    if (this.state.running) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="beer-container">
              <Beer show={this.state.time / Math.pow(2, this.state.players)}/>
              <Counter num={num} finished={this.state.finished}/>
            </div>
            <p>
              Binair bier drinken!
            </p>
          </header>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <div className="beer-container">
            <Beer show={1}/>
            <Counter num={num} finished={this.state.finished}/>
          </div>
          <p>
            Binair bier drinken!
          </p>
          <p>
            Players:
            <button onClick={this.handleDecreasePlayers}>-</button>
            {this.state.players}
            <button onClick={this.handleIncreasePlayers}>+</button>
          </p>
          <p>
            Difficulty:
            <button onClick={this.handleDecreaseDiff}>-</button>
            {this.state.difficulty}
            <button onClick={this.handleIncreaseDiff}>+</button>
          </p>
          <p>
            <button onClick={this.handleStart}>Start</button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
