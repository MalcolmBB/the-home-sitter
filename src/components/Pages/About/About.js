import React from 'react';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import './About.css';

function About(){
    return(
        <div className="AboutDiv">
            <Header></Header>
            <div className="AboutContainer">
                <h1 className="AboutHeader">About</h1>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default About;
