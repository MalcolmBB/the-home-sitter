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
        if (window.matchMedia("(max-width:768px)").matches === false){
            if (($(".headerDiv")[0].getBoundingClientRect().top === 0) && ($('.simplebar-content-wrapper')[0].scrollTop > 0)) {
                setScrolled(true);
            }
            else {
                setScrolled(false);
            }
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

    const toggleOpen = () => {
        setScrolled(!isScrolled);
    }

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
                    className={isScrolled ? "menuButton showMenu opened":"menuButton hideMenu"}
                    onClick={toggleOpen}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                    <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                    <path className="line line2" d="M 20,50 H 80" />
                    <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </div>
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
