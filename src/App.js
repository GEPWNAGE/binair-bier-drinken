import React, { Component } from 'react';
import './App.scss';
import Controls from './Controls';
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
    let height = 36 - 32 * this.props.show;
    let rect = 'rect(' + height + 'vmin, 40vmin, 40vmin, 0)';
    let spin = this.props.spin ? ' spin-img' : '';
    return (
      <div className={"beer-parent"}>
        <img src={outline} alt='Beer' className={"beer outline" + spin}/>
        <img src={beer} alt='Beer' className={"beer inside" + spin}
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
    this.handleChangePlayers = this.handleChangePlayers.bind(this);

    this.timerHandle = null;

    this.state = {
      running: false,
      time: 16,
      num: 0,
      players: 4,
      finished: false,
      spin: false
    }
  }
  handleStart(players, difficulty) {
    this.timerHandle = setInterval(this.tick, 20);
    let num = generateRandom(players, difficulty);
    this.setState({
      running: true,
      time: Math.pow(2, players),
      num: num,
      finished: false
    });
  }
  tick() {
    if (this.state.time - this.state.num <= 0.1) {
      this.setState({running: false, finished: true});
      clearInterval(this.timerHandle);
    }

    let newTime = this.state.time - (Math.pow(2, this.state.players) / 1000);
    newTime = Math.max(this.state.num, newTime);
    this.setState({time: newTime});
  }
  handleChangePlayers(players) {
    this.setState({
      players: players,
      time: Math.pow(2, players)
    });
  }
  handleTurn() {
    this.setState({spin: true});
    setTimeout(() => {
      this.setState({spin: false});
      this.initTurn();
    }, 15000);
  }
  initTurn() {
    setTimeout(() => this.handleTurn(), Math.random() * 200000);
  }
  componentDidMount() {
    this.initTurn();
  }
  render() {
    let num = Math.round(this.state.time);
    return (
      <div className="App">
        <header className="App-header">
          <div className="beer-container">
            <Beer show={this.state.time / Math.pow(2, this.state.players)} spin={this.state.spin}/>
            <Counter num={num} finished={this.state.finished}/>
          </div>
          <Controls
            display={!this.state.running}
            onChangePlayers={this.handleChangePlayers}
            onStart={this.handleStart}/>
        </header>
      </div>
    );
  }
}

export default App;
