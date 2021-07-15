import React from 'react';
import {HashRouter as Router,
        Route,
        Switch} from 'react-router-dom';
import './App.css';

//Page imports
import Home from './components/Pages/Home/Home';
import Book from './components/Pages/Book/Book';

function App() {
  return (
      <Router basename={"/"}>
          <React.Fragment>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/Home" exact component={Home}/>
                  <Route path="/Book" exact component={Book}/>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
