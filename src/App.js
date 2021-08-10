import React, { useState, useEffect } from 'react';
import {HashRouter as Router,
        Route,
        Switch,
        Redirect} from 'react-router-dom';
import './App.css';

//Page imports
import Home from './components/Pages/Home/Home';
import Gallery from './components/Pages/Gallery/Gallery';
import Testimonials from './components/Pages/Testimonials/Testimonials';
import Book from './components/Pages/Book/Book';

import * as Realm from 'realm-web';


function App() {

    const [testimonials, setTestimonials] = useState([,]);
    const [loading, setLoading] = useState(true);

    const React_App_ID = "thehomesitter-ainwl";
    const app = new Realm.App({ id: React_App_ID });

    useEffect(() => {
        async function getData(){
            const user = await app.logIn(Realm.Credentials.anonymous());
            const client = app.currentUser.mongoClient('mongodb-atlas');
            const TestText = client.db('TheHomeSitter').collection('Testimonials');;
            setTestimonials((await TestText.find()));
            setLoading(false);
        }

        if (loading){
            getData();
        }
    }, [loading]);

  return (
      <Router basename={"/"}>
          <React.Fragment>
              <Switch>
                  <Redirect exact from="/" to="Home"/>
                  <Route path="/Home" exact component={() => <Home testimonials={testimonials}/>}/>
                  <Route path="/Gallery" exact component={Gallery}/>
                  <Route path="/Testimonials" exact component={() => <Testimonials testimonials={testimonials}/>}/>
                  <Route path="/Book" exact component={Book}/>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
