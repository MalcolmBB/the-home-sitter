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
import Loading from './components/Pages/LoadingPage/loading';

import * as Realm from 'realm-web';
import axios from "axios";


function App() {

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const React_App_ID = "thehomesitter-ainwl";
    const app = new Realm.App({ id: React_App_ID });

    const [gallery, setGallery] = useState(["dd"]);
    const [aboutGallery, setAboutGallery] = useState(["dd"]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData(){
            await app.logIn(Realm.Credentials.anonymous());
            const client = app.currentUser.mongoClient('mongodb-atlas');
            const TestText = client.db('TheHomeSitter').collection('Testimonials');;
            setTestimonials((await TestText.find()));

            try {
                await axios
                  .get("https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json", { cancelToken: source.token})
                  .then((res) => {
                    setGallery(res.data.resources);
                  });
                await axios
                  .get(
                    "https://res.cloudinary.com/homesitterza/image/list/HomeSitterAbout.json", { cancelToken: source.token})
                  .then((res) => {
                    setAboutGallery(res.data.resources);
                  });
            } catch (error) {
                if (axios.isCancel(error)){
                } else {
                    throw error
                }
            }

            setLoading(false);
        }

        if (loading){
            getData();
        }

        return () =>{
            source.cancel();
        }
    }, [loading]);

  return (
      <Router basename={"/"}>
          <React.Fragment>
              <Switch>
                  <Redirect exact from="/" to="Home"/>
                  <Route path="/Loading" exact component={() => <Loading loading={loading}/>}/>
                  <Route path="/Home" exact component={() => <Home testimonials={testimonials} gallery={gallery} aboutGallery={aboutGallery}/>}/>
                  <Route path="/Gallery" exact component={() => <Gallery gallery={gallery}/>}/>
                  <Route path="/Testimonials" exact component={() => <Testimonials testimonials={testimonials}/>}/>
                  <Route path="/Book" exact component={Book}/>
              </Switch>
          </React.Fragment>
      </Router>
  );
}

export default App;
