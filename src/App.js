import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

//Page imports
import Home from "./components/Pages/Home/Home";
import Gallery from "./components/Pages/Gallery/Gallery";
import Testimonials from "./components/Pages/Testimonials/Testimonials";
import Book from "./components/Pages/Book/Book";
import Loading from "./components/Pages/LoadingPage/loading";
import AdminTestimonials from "./components/Pages/AdminTestimonials/AdminTestimonials";

import * as Realm from "realm-web";
import axios from "axios";

function App() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const React_App_ID = "thehomesitter-ainwl";


  const [gallery, setGallery] = useState(["dd"]);
  const [aboutGallery, setAboutGallery] = useState(["dd"]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function getData() {
      const app = new Realm.App({ id: React_App_ID });
      await app.logIn(Realm.Credentials.anonymous());
      const client = app.currentUser.mongoClient("mongodb-atlas");
      const TestText = client.db("TheHomeSitter").collection("Testimonials");
      setTestimonials(await TestText.find());

      try {
        await axios
          .get(
            "https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json",
            { cancelToken: source.token }
          )
          .then((res) => {
            setGallery(res.data.resources);
          });
        await axios
          .get(
            "https://res.cloudinary.com/homesitterza/image/list/HomeSitterAbout.json",
            { cancelToken: source.token }
          )
          .then((res) => {
            setAboutGallery(res.data.resources);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }

      setTimeout(() => {
          app.currentUser.logOut();
        setLoading(false);
      }, 1000);
    }

    if (loading) {
      getData();
    }

    return () => {
      source.cancel();
    };
}, [loading]);

    const [testimonialsOpen, setTestimonialsOpen] = useState(false);

    const handleSetTestimonialsOpen = (setOpenArgument) => {
        setTestimonialsOpen(setOpenArgument);
    }

    const [testimonialsActiveCard, setTestimonialsActiveCard] = useState({
        date: "placeholder",
        name: "placeholder",
        paragraph: ["placeholder", "place"]
    });

    const handleSetTestimonialsActiveCard = (setActiveCardArgument) => {
        setTestimonialsActiveCard({
            date: setActiveCardArgument.date,
            name: setActiveCardArgument.name,
            paragraph: setActiveCardArgument.paragraph
        });
    }

  return (
    <Router basename={process.env.PUBLIC_URL + '/'}>
      <React.Fragment>
        <Route
          component={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={500} classNames="PageChange">
                <Switch location={location}>
                  <Redirect exact from='/' to='/Loading'/>
                  <Route
                    path='/Loading'
                    exact
                    component={() => <Loading loading={loading}/>}
                  />
                  <Route
                    path='/Home'
                    exact
                    component={() => (
                      <Home
                        testimonials={testimonials}
                        gallery={gallery}
                        aboutGallery={aboutGallery}
                        handleTestimonialsOpen={handleSetTestimonialsOpen}
                        handleTestimonialsActive={handleSetTestimonialsActiveCard}
                      />
                    )}
                  />
                  <Route
                    path='/Gallery'
                    exact
                    component={() => <Gallery gallery={gallery} />}
                  />
                  <Route
                    path='/Testimonials'
                    exact
                    component={() => (
                      <Testimonials
                          testimonials={testimonials}
                          testimonialsOpen={testimonialsOpen}
                          testimonialsActiveCard={testimonialsActiveCard}
                      />
                    )}
                  />
                  <Route
                    path='/AdminTestimonials'
                    exact
                    component={() => (
                      <AdminTestimonials/>
                    )}
                  />
              <Route path='/Book' exact component={Book} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </React.Fragment>
    </Router>
  );
}

export default App;
