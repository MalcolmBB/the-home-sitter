import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import HomeIllustration from './HomeIllustration.js';
import Carousel from 'react-img-carousel';
import {Image, Transformation} from 'cloudinary-react';
import axios from 'axios';
import TestText from '../Testimonials/TestText';
import Card from '../../Card/Card';
import './Home.css';

require('react-img-carousel/lib/carousel.css');

function Home() {
    const [gallery, setGallery] = useState(['dd']);
    console.log("this is gallery", gallery);

    useEffect(() => {
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json').then(res => {
            console.log(res.data.resources);
            setGallery(res.data.resources);
        });
    }, [])

    return (<div className="Home div">
        <HomeIllustration class="HomeIllustration"></HomeIllustration>
        <Header></Header>
        <div className="MainContainer">
            <div className="CarouselContainer">
                <Carousel className="Carousel" transition="slide" infinite={true} transitionDuration={1000} easing="linear" dots={false} arrows={false} autoplay={true} autoplaySpeed={2000}
                    >
                    {gallery.map(data => (
                        <Image cloudName="homesitterza" publicId={data.public_id} className="Image">
                        </Image>
                    ))}
                </Carousel>
            </div>
            <div className="CarouselCardContainer">
                <Carousel className="CarouselCard" transition="slide" infinite={true} transitionDuration={1000} easing="linear" dots={false} arrows={false} autoplay={true} autoplaySpeed={2000}
                    >
                    {TestText.map(data => (
                        <Card
                            date={data.date}
                            summary={data.summary}
                        ></Card>
                    ))}
                </Carousel>
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;
