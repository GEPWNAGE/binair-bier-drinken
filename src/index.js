import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Remote from './Remote';
import * as serviceWorker from './serviceWorker';

const Main = props => (
    <Router>
      <Switch>
        <Route path="/remote/:handle" component={Remote} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
);

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
