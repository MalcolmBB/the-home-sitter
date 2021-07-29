import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import HomeIllustration from './HomeIllustration.js';
import Slider from 'react-slick';
import Carousel from 'react-material-ui-carousel';
import {Image} from 'cloudinary-react';
import axios from 'axios';
import TestText from '../Testimonials/TestText';
import Card from '../../Card/Card';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    // const settings1  = {
    //   dots: false,
    //   infinite: true,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   autoplaySpeed: 0,
    //   speed: 5000,
    //   cssEase:"linear",
    //   pauseOnHover: false,
    //   variableWidth: true,
    //   draggable: false,
    //   arrows: false
    // };

    var settings1  = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };

    const settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase:"linear",
      pauseOnHover: true,
      arrows: false,
      variableWidth: true
    };

    return (<div className="Home div">
        <HomeIllustration class="HomeIllustration"></HomeIllustration>
        <Header></Header>
        <div className="MainContainer">
            <div className="CarouselContainer">
                <h2 className="CarouselLabel">Gallery</h2>
                <Carousel
                    timeout="1000"
                    >
                    {gallery.map(data => (
                        <Image cloudName="homesitterza" publicId={data.public_id} className="Image">
                        </Image>
                    ))}
                </Carousel>
            </div>
            <div className="CarouselCardContainer">
                <Slider {...settings2}>
                    {TestText.map(data => (
                            <Card
                                classes="Card homeCard"
                                date={data.date}
                                summary={data.summary}
                            ></Card>
                    ))}
                </Slider>
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;
