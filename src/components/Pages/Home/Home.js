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
import SwiperCore, {Autoplay, EffectFade, EffectCoverflow} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
SwiperCore.use([Autoplay, EffectFade, EffectCoverflow]);

function Home() {
    const [gallery, setGallery] = useState(['dd']);

    useEffect(() => {
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json').then(res => {
            setGallery(res.data.resources);
        });
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitterAbout.json').then(res => {
            setAboutGallery(res.data.resources);
        });
    }, [])

    const [aboutGallery, setAboutGallery] = useState(['dd']);

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
                    value="Book a homesitter now!"
                    onClick={clickThing}
                ></Button>
            </div>
        </div>
        <Header></Header>
        <div className="MainContainer">
            <div className="AboutContainer">
                <h1 className="AboutLabel">About</h1>
                <div className="AboutMain">
                    <p className="AboutMainContent">My name is Julia - a dedicated, reliable and enthusiastic UCT student who is ready to help wherever I can! I offer house/pet sitting, dog walking and cat feeding - with my own transport. Based in Southern Suburbs and surrounds.</p>
                    <Swiper
                        slidesPerView={1}
                        centeredSlides={true}
                        allowTouchMove={false}
                        speed={2500}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false
                        }}
                        fade={{crossfade: true}}
                        effect="fade"
                        >
                        {aboutGallery.map((data, i) => (
                            <SwiperSlide
                                style={{width: "auto"}}>
                                <Image key={i} cloudName="homesitterza" publicId={data.public_id} className="aboutImage">
                                </Image>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="CarouselContainer">
                <h1 className="CarouselLabel">Gallery</h1>
                <Swiper
                    slidesPerView="auto"
                    centeredSlides={true}
                    speed={2500}
                    loop={true}
                    effect='coverflow'
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
                <h1 className="TestimonialCarouselLabel">Testimonial summaries</h1>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    speed={2500}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    >
                    {TestText.map(data => (
                            <SwiperSlide style={{ width: "auto"}}>
                                <Card
                                    classes="Card homeCard"
                                    name={data.name}
                                    summary={data.summary}
                                    paragraph={data.paragraph}
                                ></Card>
                            </SwiperSlide>
                    ))}
                </Swiper>
                <Button
                    type="Navigation"
                    classes="button bTestimonialsMain"
                    linkTo="/Testimonials"
                    value="View more!"
                    onClick={clickThing}
                ></Button>
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;
