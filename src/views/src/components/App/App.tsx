import React from 'react';
import './App.css';
// import Home from '../Home/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Store from '../Store/Store';
import Header from '../Header/Header';

/**
 * App component
 */
function App() {
  return (
    <Router>
      <Header>
          <Switch>
            <Route path='/store'>
              <Store />
            </Route>
            <Route path='/'>
              <Store />
            </Route>
          </Switch>
      </Header>
    </Router>
  );
}

export default App;
