import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Button from "../../button/button.js";
import HomeIllustration from './HomeIllustration.js';
import {Image} from 'cloudinary-react';
import axios from 'axios';
import TestText from '../Testimonials/TestText';
import Card from '../../Card/Card';
import './Home.css';

// Swiper initialisation
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
SwiperCore.use([Autoplay]);

function Home() {
    const [gallery, setGallery] = useState(['dd']);
    console.log("this is gallery", gallery);

    useEffect(() => {
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json').then(res => {
            console.log(res.data.resources);
            setGallery(res.data.resources);
        });
    }, [])

    const clickThing = () => {
        // $('.simplebar-content-wrapper')[0].scroll({top: 0, left: 0, behavior: 'smooth'})
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
        document.activeElement.blur();
    };

    return (<div className="Home div">
        <div className="IllustrationContainer">
            <HomeIllustration class="HomeIllustration"></HomeIllustration>
            <div className="CTAContainer">
                <h1 className="LandingHeader">I'll take care of your pets and your home!</h1>
                <Button
                    type="Navigation"
                    classes="button bBookLanding"
                    linkTo="/Book"
                    value="Book a homesitter now!!"
                    onClick={clickThing}
                ></Button>
            </div>
        </div>
        <Header></Header>
        <div className="MainContainer">
            <div className="CarouselContainer">
                <h2 className="CarouselLabel">Gallery</h2>
                <Swiper
                    slidesPerView="auto"
                    centeredSlides={true}
                    speed={2500}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    >
                    {gallery.map((data, i) => (
                        <SwiperSlide
                            style={{width: "auto"}}>
                            <Image key={i} cloudName="homesitterza" publicId={data.public_id} className="Image">
                            </Image>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button
                    type="Navigation"
                    classes="button bGalleryMain"
                    linkTo="/Gallery"
                    value="View more!"
                    onClick={clickThing}
                ></Button>
            </div>
            <div className="CarouselCardContainer">
                <h2 className="TestimonialCarouselLabel">Testimonial summaries</h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    speed={2500}
                    loop={true}
                    autoplay={{
                        delay: 5000
                    }}
                    >
                    {TestText.map(data => (
                            <SwiperSlide style={{ width: "auto"}}>
                                <Card
                                    classes="Card homeCard"
                                    date={data.date}
                                    summary={data.summary}
                                ></Card>
                            </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;
