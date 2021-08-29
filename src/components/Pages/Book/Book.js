import React, {useState, useEffect, useRef} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Dogs from "./Dogs/Dogs";
import Cats from "./Cats/Cats";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {DateRange} from 'react-date-range';
import {addDays} from 'date-fns';
import Button from '../../button/button';
import './Book.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {differenceInDays} from 'date-fns';
import $ from 'jquery';
import * as emailjs from 'emailjs-com';

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

var validator = require("email-validator");

function Book(props) {
    const [details, setDetails] = useState({name: "", email: "", cellNumber: "", preferredContact: ""});

    const [service, setService] = useState('houseSit');

    const changeService = (event) => {
        setService(event.target.value);
    };

    const [selectedRange, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        }
    ]);

    const [numberOfDays, setDays] = useState(differenceInDays(selectedRange[0].endDate, selectedRange[0].startDate) + 1);

    const handleDateChange = (item) => {
        setRange([item.selection]);
        if (service === "houseSit") {
            setDays(differenceInDays([item.selection][0].endDate, [item.selection][0].startDate));
        } else {
            setDays(differenceInDays([item.selection][0].endDate, [item.selection][0].startDate) + 1);
        }
    }

    const preferredContact = [
        {
            value: 'Email',
            label: "Email"
        }, {
            value: 'WhatsApp',
            label: "WhatsApp"
        }
    ]

    const [numHours, setHours] = useState(1);

    const [estimatedPrice, setPrice] = useState(200);

    const calculatePrice = () => {
        switch (service) {
            case "houseSit":
                setPrice(200 * numberOfDays);
                break;
            case "dogWalk":
                setPrice(100 * numberOfDays);
                break;
            case "daySit":
                setPrice(150 * numberOfDays);
                break;
            case "petFeeding":
                setPrice(60 * numHours * numberOfDays);
                break;
            default:
                setPrice(200);
        }
    }

    useEffect(() => {
        if (service === "houseSit") {
            setDays(differenceInDays(selectedRange[0].endDate, selectedRange[0].startDate));
        } else {
            setDays(differenceInDays(selectedRange[0].endDate, selectedRange[0].startDate) + 1);
        }
        calculatePrice();
    }, [service, selectedRange, calculatePrice]);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const getNiceDate = (date) => {
        let outputString = "";
        switch (date.getDay()) {
            case 1:
                outputString += "Monday the ";
                break;
            case 2:
                outputString += "Tuesday the ";
                break;
            case 3:
                outputString += "Wednesday the ";
                break;
            case 4:
                outputString += "Thursday the ";
                break;
            case 5:
                outputString += "Friday the ";
                break;
            case 6:
                outputString += "Saturday the ";
                break;
            case 7:
                outputString += "Sunday the ";
                break;
        }

        outputString += date.getDate() + nth(date.getDate()) + " of ";

        outputString += monthNames[date.getMonth()] + " ";

        outputString += date.getFullYear();

        return outputString;
    }

    const nth = (n) => {
        return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"
    }

    const [emailParams, setEmailParams] = useState({
        name: "-1",
        nameError: "",
        email: "default@default.com",
        emailError: "",
        cellPhone: "",
        cellError: "",
        preferredContact: "",
        preferredError: "",
        service: "House Sitting",
        startDate: getNiceDate(selectedRange[0].startDate),
        endDate: getNiceDate(selectedRange[0].endDate),
        estimatedPrice: ""
    });

    const handleSubmit = () => {
        setEmailParams({
            ...emailParams,
            name: details.name,
            nameError: (details.name === "John Doe" || details.name === "") === true
                ? "Please enter a valid name"
                : "",

            email: details.email,
            emailError: verifyEmail(details.email) === false
                ? "Please enter a valid email address"
                : "",

            cellPhone: details.cellNumber,
            cellError: (details.cellNumber.length === 10 && details.cellNumber !== "") === false
                ? "Please enter a valid cellphone number"
                : "",

            preferredContact: details.preferredContact,
            preferredError: details.preferredContact === ""
                ? "Please choose a preferred contact method"
                : "",

            service: getNiceServiceName(),

            startDate: getNiceDate(selectedRange[0].startDate),

            endDate: getNiceDate(selectedRange[0].endDate),

            estimatedPrice: estimatedPrice
        })
    }

    const getNiceServiceName = () => {
        switch (service) {
            case "houseSit":
                return "House sitting"
            case "dogWalk":
                return "Dog walking"
            case "daySit":
                return "Day sitting"
            case "petFeeding":
                return "Pet feeding"
            default:
                return "House sitting"
        }
    }

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const cellRef = useRef(null);
    const preferredRef = useRef(null);

    useEffect(() => {
        if (emailParams.nameError !== "") {
            nameRef.current.focus();
        } else if (emailParams.emailError !== "") {
            emailRef.current.focus();
        } else if (emailParams.cellError !== "") {
            cellRef.current.focus();
        } else if (emailParams.preferredError !== "") {
            preferredRef.current.focus();
        } else if (emailParams.email !== "default@default.com") {
            document.activeElement.blur();
            setShowDialog(true);
        }
        clickThing();
    }, [emailParams])

    const verifyEmail = (testEmail) => {
        if (validator.validate(testEmail) && testEmail !== "") {
            return true;
        } else {
            return false;
        }
    }

    const sendBooking = () => {
        const templateParams = {
            from_name: emailParams.name,
            from_email: emailParams.email,
            from_cellphone: emailParams.cellPhone,
            to_name: 'Julia Boland',
            preferred_contact: emailParams.preferredContact,
            service: emailParams.service,
            start_date: emailParams.startDate,
            end_date: emailParams.endDate,
            estimated_price: emailParams.estimatedPrice
        };
        // emailjs.send(
        //     'service_tb7w78g',
        //     'template_gtqy5gd',
        //     templateParams,
        //     'user_PFWwwo3BfFxRoPtwprZCw'
        // )
        resetAll();
    }

    const clickThing = () => {
        $('.simplebar-content-wrapper')[0].scroll({top: 0, left: 0, behavior: 'smooth'})
    };

    const [showDialog, setShowDialog] = useState(false);
    const [dialogSend, setDialogSend] = useState(false);

    const resetAll = () => {
        setDetails({name: "", email: "", cellNumber: "", preferredContact: ""});
        setService('houseSit');
        setRange([
            {
                startDate: new Date(),
                endDate: addDays(new Date(), 2),
                key: 'selection'
            }
        ]);
        setHours(1);
        setPrice(200)
        setEmailParams({
            name: "-1",
            nameError: "",
            email: "default@default.com",
            emailError: "",
            cellPhone: "",
            cellError: "",
            preferredContact: "",
            preferredError: "",
            service: "House Sitting",
            startDate: "",
            endDate: "",
            estimatedPrice: ""
        });
        setShowDialog(false)
        setDialogSend(false)
    }

    return (<SimpleBar className="MainPageDiv" style={{
            height: "100vh"
        }} forceVisible="y" autoHide={false}>
        <div className="BookDiv">
            <Header></Header>
            <div className="BookContainer">
                <div className="detailsContainer">
                    <div className="detailsInnerContainer">
                        <h2 className="detailsLabel">Please enter your personal details</h2>
                        <form className="detailsForm" action="">
                            <div className="detailsInput">
                                <TextField className="nameInput" label="Name" placeholder="John Doe" required fullWidth value={details.name} inputRef={nameRef} onChange={(event) => {
                                        setDetails({
                                            ...details,
                                            name: event.target.value
                                        })
                                    }} error={emailParams.nameError !== ""} helperText={emailParams.nameError}
                                ></TextField>
                            </div>
                            <div className="detailsInput">
                                <TextField className="emailInput" label="Email address" placeholder="johndoe@email.com" type='email' required fullWidth value={details.email} inputRef={emailRef} onChange={(event) => (setDetails({
                                        ...details,
                                        email: event.target.value
                                    }))} error={emailParams.emailError !== ""} helperText={emailParams.emailError}></TextField>
                            </div>
                            <div className="detailsInput">
                                <TextField className="numberInput" label="Cellphone number" placeholder="0123456789" type="tel" inputProps={{
                                        minLength: 10,
                                        maxLength: 10
                                    }} required fullWidth value={details.cellNumber} inputRef={cellRef} onChange={(event) => (setDetails({
                                        ...details,
                                        cellNumber: event.target.value
                                    }))} error={emailParams.cellError !== ""} helperText={emailParams.cellError}></TextField>
                            </div>
                            <div className="detailsInput">
                                <TextField className="contactMethodInput" label="Preferred contact method" select required fullWidth value={details.preferredContact} inputRef={preferredRef} onChange={(event) => (setDetails({
                                        ...details,
                                        preferredContact: event.target.value
                                    }))} error={emailParams.preferredError !== ""} helperText={emailParams.preferredError}>
                                    {
                                        preferredContact.map((option) => (<MenuItem
                                            className="MenuItem" style={{
                                                fontFamily: "Alice, serif"
                                            }} key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>))
                                    }
                                </TextField>
                            </div>
                        </form>
                    </div>
                    <Dogs></Dogs>
                </div>
                <div className="serviceContainer">
                    <FormControl component="fieldset">
                        <FormLabel className="serviceLabel" component="h2">Please select the main service your require</FormLabel>
                        <RadioGroup aria-label="service" name='service' value={service} onChange={changeService}>
                            <div className="serviceOptionContainer">
                                <FormControlLabel className={service === "houseSit"
                                        ? "serviceOption checked"
                                        : "serviceOption"} value="houseSit" control={<Radio/>} label={<div className = "contentWrap" > <h3>House Sitting</h3>
                                    <h5>Duration varies • R200/night</h5>
                                    <p>To stay overnight at your home - keep pets company, go on walks, water plants and watch over the house.</p>
                                </div>}/>
                                <FormControlLabel className={service === "daySit"
                                        ? "serviceOption checked"
                                        : "serviceOption"} value="daySit" control={<Radio/>} label={<div className = "contentWrap" > <h3>Day Sitting</h3>
                                    <h5>Duration varies • R150/day</h5>
                                    <p>Daily rate to watch over the dogs and cats while you're out and about, and make sure they aren't too lonely!
                                    </p>
                                </div>}/>
                                <FormControlLabel className={service === "dogWalk"
                                        ? "serviceOption checked"
                                        : "serviceOption"} value="dogWalk" control={<Radio/>} label={<div className = "contentWrap" > <h3>Dog Walking</h3>
                                    <h5>1 hour • R100</h5>
                                    <p>I have my own transport to take dogs to a nearby trail/greenbelt for a walk, run around or quick swim. R80/hour if only walking around the neighbourhood.
                                    </p>
                                </div>}/>
                                <FormControlLabel className={service === "petFeeding"
                                        ? "serviceOption checked"
                                        : "serviceOption"} value="petFeeding" control={<Radio/>} label={<div className = "contentWrap" > <h3>Pet Feeding</h3>
                                    <h5>1 hour • R60/visit</h5>
                                    <p>To stop by and feed your cats or dogs instead of staying the night. I&#39;d also stay for an hour to cuddle and play with them!</p>
                                </div>}/>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="dateContainer">
                    <div className="dateInnerContainer">
                        <h2 className="dateLabel">Please select the date(s) you would like to book for</h2>
                        <DateRange className="dateRange" onChange={item => handleDateChange(item)} showSelectionPreview={true} moveRangeOnFirstSelection={false} minDate={new Date()} ranges={selectedRange} direction="horizontal" rangeColors={["var(--primary)"]}/>
                        <div className="dateRangeNumber detailsInput">
                            <h3 className="dateRangeNumberLabel">{
                                    service === "houseSit"
                                        ? "Number of nights"
                                        : "Number of days"
                                }</h3>
                            <Input className="estimatedPriceDisplay" label="Number of days" disabled value={numberOfDays}></Input>
                        </div>
                    </div>
                    <Cats></Cats>
                </div>
                <div className={service === "houseSit" || service === "dogWalk" || service === "daySit"
                        ? "timeContainer noShowTime"
                        : "timeContainer"}>
                    <h2 className="timeLabel">Please enter how many hours you require services for</h2>
                    <div className="detailsInput timeInputContainer">
                        <TextField className="timeInput" label="Number of hours" placeholder="1" type='number' inputProps={{
                                max: 10,
                                min: 1
                            }} required fullWidth value={numHours}
                            onChange={(event) => {
                                setHours(event.target.value);
                            }}
                            onBlur={(event) => (
                                event.target.value > 10
                                ? setHours(10)
                                : event.target.value < 1
                                    ? setHours(1)
                                    : setHours(event.target.value))}></TextField>
                    </div>
                </div>
                <div className="submitContainer">
                    <h2 className="submitLabel">Please see the estimated price below and confirm the booking</h2>
                    <div className="estimatedPriceContainer detailsInput">
                        <h3 className="estimatedPriceLabel">*Estimated price:</h3>
                        <Input className="estimatedPriceDisplay" disabled startAdornment={<InputAdornment position = "start" > R</InputAdornment>} value={estimatedPrice}></Input>
                    </div>
                    <h4 className="priceEstimateNotice">*Please note that the estimated price provided may change.</h4>
                    <Button type="Submit" classes="button bSubmitBooking" value="Confirm booking" onClick={handleSubmit}></Button>
                </div>
                <Dialog className="dialogConfirm" open={showDialog}>
                    <h3 className="dialogConfirmHeader">Booking request confirmation</h3>
                    <p className="dialogConfirmParagraph">
                        Please confirm that you, {emailParams.name}, would like to book The HomeSitter for {emailParams.service} from {emailParams.startDate} till {emailParams.endDate}.
                        <br/>
                        <br/>
                        The estimated price is R{emailParams.estimatedPrice}.
                        <br/>
                        <br/>
                        You will be contacted via {emailParams.preferredContact}
                        at {
                            emailParams.preferredContact === "WhatsApp"
                                ? emailParams.cellPhone
                                : emailParams.email
                        }
                        <br/>
                        <br/>
                        Thank you for choosing The HomeSitter!
                    </p>
                    <div className="buttonContainerDialog">
                        <Button type="Submit" value="Cancel" classes="dialogButton bCancelBooking" onClick={() => {
                                setShowDialog(false)
                            }}></Button>
                        <Button type="Submit" value="Confirm booking request" classes="button dialogButton bSendBooking bSubmitBooking" onClick={() => {
                                setDialogSend(true);
                                setTimeout(() => {
                                    setDialogSend(false);
                                    setTimeout(() => {
                                        setShowDialog(false);
                                        sendBooking();
                                    }, 250)
                                }, 1200);
                            }}></Button>
                    </div>
                    <Dialog className="dialogSend" open={dialogSend}>
                        <h3 className="dialogSendConfirmation">Your booking request has been sent!</h3>
                    </Dialog>
                </Dialog>
            </div>
            <Footer pageName="Book"></Footer>
        </div>
    </SimpleBar>);
}

export default Book;
