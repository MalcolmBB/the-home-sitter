import React from 'react';
import Button from '../button/button';
import Contact from './contact';
import Doggy from '../Icon/doggy';
import './footer.css';

function Footer(props){
    const {pageName} = props;

    const clickThing = () => {
        // $('.simplebar-content-wrapper')[0].scroll({top: 0, left: 0, behavior: 'smooth'})
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        document.activeElement.blur();
    };

    return (
        <div className="footerContainer">
            <div className={pageName === "Book" ? "footerDiv bookFooter" : "footerDiv"}>
                <div className={pageName === "Book" ? "LogoAndLinksContainer bookLinks" : "LogoAndLinksContainer"}>
                    {/*// TODO: Make the a tag a button that navigates back to home. with the dog logo as the value. Can just have the logo between the two tags*/}
                    <a onClick={clickThing}>
                        <Doggy class="DogLogo"></Doggy>
                    </a>
                    <Button
                        type="LinkEmpty"
                        classes={"bFacebookFooter footer"}
                        linkTo="https://www.facebook.com/thehomesitterCT/"
                    ></Button>
                    <Button
                        type="LinkEmpty"
                        classes={"bWhatsAppFooter footer"}
                        linkTo="https://api.whatsapp.com/send?phone=27761420263"
                    ></Button>
                </div>
                <Contact></Contact>
            </div>
            <div className="MadeBy">
                <p>Made with ♥ by <a target="_blank" href="https://malcolmbaatjies.me/#/">Malcolm Baatjies</a></p>
            </div>
            <div className="LegalLinksContainer">
                <a className="PrivacyPolicy">Privacy Policy</a>
                <p className="Copyright">©2021 Julia Boland. All rights reserved</p>
                <a className="Sitemap">Sitemap</a>
            </div>
        </div>

    );
}

export default Footer;
