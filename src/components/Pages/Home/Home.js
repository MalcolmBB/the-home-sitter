import React, {useState, useEffect} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
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

    return (<div className="Home div">
        <HomeIllustration class="HomeIllustration"></HomeIllustration>
        <Header></Header>
        <div className="MainContainer">
            <div className="CarouselContainer">
                <h2 className="CarouselLabel">Gallery</h2>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
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
            </div>
            <div className="CarouselCardContainer">
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
