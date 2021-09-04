import React, {useState, useEffect} from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import Button from '../../button/button.js';
import Card from '../../Card/Card.js';
import Dialog from '@material-ui/core/Dialog';
import './Testimonials.css';

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function Testimonials(props) {
    const [testimonialsOpen, setTestimonialsOpen] = useState(false);
    const propsTestimonialsOpen = props.testimonialsOpen;
    const handlePropsSetTest = props.handleTestimonialsOpen;

    useEffect(() => {
        if (propsTestimonialsOpen === "fromHome") {
            setTimeout(() => {
                setTestimonialsOpen(true);
            },600);
        }

        return () => {
          handlePropsSetTest();
        };
    }, [propsTestimonialsOpen, handlePropsSetTest]);

    const [testimonialsActiveCard, setTestimonialsActiveCard] = useState(props.testimonialsActiveCard);

    return (
        <SimpleBar className="MainPageDiv" style={{ height: "100vh" }} forceVisible="y" autoHide={false}>
        <div className="TestimonialsDiv">
            <Header></Header>
            <div className="TestimonialsContainer">
                <h1 className="TestimonialsHeader">Testimonials</h1>
                <h3 className="TestimonialsHelp">*Click on a card to view the full testimonial</h3>
                <div className="cardContainer">
                    {props.testimonials.map((data, key) => (
                        <Card
                            key={key}
                            type="TestPage"
                            classes="Card testCard"
                            date={data.date}
                            name={data.name}
                            summary={data.summary}
                            paragraph={data.paragraph}
                            onClick={(event) => {
                                setTestimonialsActiveCard({
                                    date: data.date,
                                    name: data.name,
                                    paragraph: data.paragraph
                                });
                                setTestimonialsOpen(true)
                            }}
                        ></Card>
                    ))}
                </div>
                <Dialog className="Dialog" maxWidth="xl" open={testimonialsOpen} onClose={(event) => (setTestimonialsOpen(false))}>
                    <div className="DialogContent">
                        <div className="DialogHead">
                            <svg
                                className="DialogQuote"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                            >
                              <path d="M13 14.725C13 9.584 16.892 4.206 23 3l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746A5.213 5.213 0 0124 16.021C24 19.203 21.416 21 18.801 21 15.786 21 13 18.695 13 14.725zm-13 0C0 9.584 3.892 4.206 10 3l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746A5.213 5.213 0 0111 16.021C11 19.203 8.416 21 5.801 21 2.786 21 0 18.695 0 14.725z" />
                            </svg>
                            <Button
                                classes="button bClose"
                                type="ActionEmpty"
                                iconName="Close"
                                onClick={(event) => (setTestimonialsOpen(false))}
                            ></Button>
                        </div>
                        {testimonialsActiveCard.paragraph.map((par, key) => (
                            <p key={key} style={{whiteSpace:"pre-line",}}>
                                {par}
                            </p>
                            ))}
                    </div>
                    <div className="DialogDetails">
                        <h4 className="dialogNameHeader">{testimonialsActiveCard.name}</h4>
                        <h5 className="dialogDateHeader">{testimonialsActiveCard.date}</h5>
                    </div>
                </Dialog>
            </div>
            <Footer pageName="Testimonials"></Footer>
        </div>
        </SimpleBar>
    );
}

export default Testimonials;
