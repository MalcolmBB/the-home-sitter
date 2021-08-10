import React, {useState} from 'react'
import Button from '../button/button';
import $ from 'jquery';
import "./header.css"

const headerButtonsList = [
    {
        type: "Navigation",
        classes: "button bHome header",
        linkTo: "/Home",
        value: "Home"
    },
    {
        type: "Navigation",
        classes: "button bTestimonials header",
        linkTo: "/Testimonials",
        value: "Testimonials"
    },
    {
        type: "Navigation",
        classes: "button bGallery header",
        linkTo: "/Gallery",
        value: "Gallery"
    }
    ,
    {
        type: "Navigation",
        classes: "button bBook header",
        linkTo: "/Book",
        value: "Book a HomeSitter"
    }
]

function Header(){
    const [isScrolled, setScrolled] = useState(false);

    const toggleScrolled = () => {
        if (($(".headerDiv")[0].getBoundingClientRect().top === 0) && ($('.simplebar-content-wrapper')[0].scrollTop >= $('.simplebar-content-wrapper')[0].scrollHeight*0.06)){
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    };

    if ($('.simplebar-content-wrapper')[0] !== undefined){
        $('.simplebar-content-wrapper')[0].addEventListener('scroll', toggleScrolled);
    }

    const clickThing = () => {
        $('.simplebar-content-wrapper')[0].scroll({top: 0, left: 0, behavior: 'smooth'})
        // window.scroll({top: 0, left: 0, behavior: 'smooth'})
        document.activeElement.blur();
    };


    return (
        <div className={isScrolled ? "headerScrolled headerDiv" : "headerBar headerDiv"}>
                <Button
                    type="LogoMain"
                    classes={!isScrolled ? "bLogoMain header" : "bLogoMainScrolled bLogoMain header"}
                    linkTo={"/Home"}
                    value={"The HomeSitter"}
                    onClick={clickThing}
                ></Button>

                <div
                    className={!isScrolled ? "buttonContainer": "buttonContainerScrolled buttonContainer"}
                >
                {headerButtonsList.map((bButton, key) => (
                    <Button
                        key={key}
                        type={bButton.type}
                        classes={bButton.classes}
                        linkTo={bButton.linkTo}
                        value={bButton.value}
                        onClick={clickThing}
                    ></Button>
                ))}
                </div>
        </div>
    );
}

export default Header;
