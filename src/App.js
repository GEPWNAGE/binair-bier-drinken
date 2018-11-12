import React, { Component } from 'react';
import './App.scss';
import outline from './logo_beer_no_inside.svg'
import beer from './logo_beer_nosides.svg'

class Counter extends Component {
  render() {
    return <div className="counter">{this.props.num}</div>;
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="beer-container">
            <Beer show={0.33333}/>
            <Counter num={16}/>
          </div>
          <p>
            Binair bier drinken!
          </p>
        </header>
      </div>
    );
  }
}

export default App;
