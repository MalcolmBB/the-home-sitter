import React from 'react';
import {HashRouter as Router,
        Route,
        Switch,
        Redirect} from 'react-router-dom';
import './App.css';

//Page imports
import Home from './components/Pages/Home/Home';
import Book from './components/Pages/Book/Book';
import Testimonials from './components/Pages/Testimonials/Testimonials';
import Gallery from './components/Pages/Gallery/Gallery';

function App() {
  return (
      <Router basename={"/"}>
          <React.Fragment>
              <Switch>
                  <Redirect exact from="/" to="Home"/>
                  <Route path="/Home" exact component={Home}/>
                  <Route path="/Book" exact component={Book}/>
                  <Route path="/Testimonials" exact component={Testimonials}/>
                  <Route path="/Gallery" exact component={Gallery}/>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
