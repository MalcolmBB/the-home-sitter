import React from 'react';
import {HashRouter as Router,
        Route,
        Switch} from 'react-router-dom';
import './App.css';

//Page imports
import Home from './components/Pages/Home/Home';

function App() {
  return (
      <Router basename={"/"}>
          <React.Fragment>
              <Switch>
                  <Route path= "/" exact component={Home}/>
                  <Route path= "/Home" exact component={Home}/>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
