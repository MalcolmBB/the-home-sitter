import React, {useState} from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import Card from '../../Card/Card.js';
import TestText from './TestText.js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import './Testimonials.css';


function Testimonials() {
    const [open, setOpen] = useState(false);

    const [activeCard, setActiveCard] = useState({
        date: "placeholder",
        name: "placeholder",
        paragraph: ["placeholder", "place"]
    });

    return (
        <div className="TestimonialsDiv">
            <Header></Header>
            <div className="TestimonialsContainer">
                <h1 className="TestimonialsHeader">Testimonials</h1>
                <div className="cardContainer">
                    {TestText.map((data, key) => (
                        <Card
                            key={key}
                            type="TestPage"
                            classes="Card testCard"
                            date={data.date}
                            name={data.name}
                            summary={data.summary}
                            paragraph={data.paragraph}
                            onClick={(event) => (
                                setActiveCard({
                                    date: data.date,
                                    name: data.name,
                                    paragraph: data.paragraph
                                }),
                                setOpen(true)
                            )}
                        ></Card>
                    ))}
                </div>
                <Dialog className="Dialog" maxWidth="xl" open={open} onClose={(event) => (setOpen(false))}>
                    <DialogTitle className="DialogTitle" onClose={(event) => (setOpen(false))}>
                        <h4 className="dialogNameHeader">{activeCard.name}</h4>
                        <h5 className="dialogDateHeader">{activeCard.date}</h5>
                    </DialogTitle>
                    <DialogContent>
                        {activeCard.paragraph.map((par, key) => (
                            <p key={key} style={{whiteSpace:"pre-line",}}>
                                {par}
                            </p>
                            ))}
                    </DialogContent>
                </Dialog>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default Testimonials;
