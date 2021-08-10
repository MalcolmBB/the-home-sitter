import React, {useState, useEffect} from 'react';
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
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import Button from '../../button/button';
import './Book.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { differenceInDays } from 'date-fns';

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function Book(){
    const [details, setDetails] = useState(
        {
            name: "John Doe",
            email: "johndoe@email.com",
            cellNumber: "0123456789",
            preferredContact: "whatsapp"
        }
    );

    const [service, setService] = useState('houseSit');

    const changeService = (event) =>{
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
        if (service === "houseSit"){
            setDays(differenceInDays([item.selection][0].endDate, [item.selection][0].startDate));
        }
        else {
            setDays(differenceInDays([item.selection][0].endDate, [item.selection][0].startDate) + 1);
        }
    }

    const preferredContact = [
        {
            value: 'email',
            label: "Email",
        },
        {
            value: 'whatsapp',
            label: "WhatsApp",
        }
    ]

    const [numHours, setHours] = useState(1);

    const [estimatedPrice, setPrice] = useState(200);

    const calculatePrice = () => {
        switch (service) {
            case "houseSit":
                setPrice(200*numberOfDays);
                break;
            case "dogWalk":
                setPrice(100*numberOfDays);
                break;
            case "daySit":
                setPrice(150*numberOfDays);
                break;
            case "petFeeding":
                setPrice(60*numHours*numberOfDays);
                break;
            default:
                setPrice(200);
        }
    }

    useEffect(() => {
        calculatePrice();
        if (service === "houseSit"){
            setDays(differenceInDays(selectedRange[0].endDate, selectedRange[0].startDate));
        }
        else {
            setDays(differenceInDays(selectedRange[0].endDate, selectedRange[0].startDate) + 1);
        }
    });


    return(
        <SimpleBar style={{ height: "100vh" }} forceVisible="y" autoHide={false}>
        <div className="BookDiv">
            <Header></Header>
            <div className="BookContainer">
                <div className="detailsContainer">
                    <div className="detailsInnerContainer">
                        <h2 className="detailsLabel">Please enter your personal details</h2>
                        <form
                        className="detailsForm"
                        action="">
                        <div className="detailsInput">
                            <TextField
                                className="nameInput"
                                label="Name"
                                placeholder="John Doe"
                                required
                                fullWidth
                                onChange={(event) => (setDetails({ ...details, name : event.target.value}))}
                            ></TextField>
                        </div>
                        <div className="detailsInput">
                            <TextField
                                className="emailInput"
                                label="Email address"
                                placeholder="johndoe@email.com"
                                type='email'
                                required
                                fullWidth
                                onChange={(event) => (setDetails({ ...details, email : event.target.value}))}
                            ></TextField>
                        </div>
                        <div className="detailsInput">
                            <TextField
                                className="numberInput"
                                label="Cellphone number"
                                placeholder="0123456789"
                                type="tel"
                                inputProps={{ minLength: 10, maxLength:10}}
                                required
                                fullWidth
                                onChange={(event) => (setDetails({ ...details, cellNumber : event.target.value}))}
                            ></TextField>
                        </div>
                        <div className="detailsInput">
                            <TextField
                                className="contactMethodInput"
                                label="Preferred contact method"
                                select
                                required
                                fullWidth
                                onChange={(event) => (setDetails({ ...details, preferredContact : event.target.value}))}
                            >
                                {preferredContact.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
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
                            <div className="serviceOptionContainer" >
                                <FormControlLabel
                                    className={service==="houseSit" ? "serviceOption checked" : "serviceOption"}
                                    value="houseSit"
                                    control={<Radio/>}
                                    label={
                                        <div className="contentWrap">
                                            <h3>House Sitting</h3>
                                            <h5>Duration varies • R200/night</h5>
                                            <p>To stay overnight at your home - keep pets company, go on walks, water plants and watch over the house.</p>
                                        </div>
                                    }
                                />
                                <FormControlLabel
                                    className={service==="daySit" ? "serviceOption checked" : "serviceOption"}
                                    value="daySit"
                                    control={<Radio/>}
                                    label={
                                        <div className="contentWrap">
                                            <h3>Day Sitting</h3>
                                            <h5>Duration varies • R150/day</h5>
                                            <p>Daily rate to watch over the dogs and cats while you're out and about, and make sure they aren't too lonely! </p>
                                        </div>
                                    }
                                />
                                <FormControlLabel
                                    className={service==="dogWalk" ? "serviceOption checked" : "serviceOption"}
                                    value="dogWalk"
                                    control={<Radio/>}
                                    label={
                                        <div className="contentWrap">
                                            <h3>Dog Walking</h3>
                                            <h5>1 hour • R100</h5>
                                            <p>I have my own transport to take dogs to a nearby trail/greenbelt for a walk, run around or quick swim. R80/hour if only walking around the neighbourhood. </p>
                                        </div>
                                    }
                                />
                                <FormControlLabel
                                    className={service==="petFeeding" ? "serviceOption checked" : "serviceOption"}
                                    value="petFeeding"
                                    control={<Radio/>}
                                    label={
                                        <div className="contentWrap">
                                            <h3>Pet Feeding</h3>
                                            <h5>1 hour • R60/visit</h5>
                                            <p>To stop by and feed your cats or dogs instead of staying the night. I&#39;d also stay for an hour to cuddle and play with them!</p>
                                        </div>
                                    }
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="dateContainer">
                    <div className="dateInnerContainer">
                        <h2 className="dateLabel">Please select the date(s) you would like to book for</h2>
                        <DateRange
                            className="dateRange"
                            onChange={item => handleDateChange(item)}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            ranges={selectedRange}
                            direction="horizontal"
                            rangeColors={["var(--primary)"]}
                        />
                        <div className="dateRangeNumber detailsInput">
                        <h3 className="dateRangeNumberLabel">{service ==="houseSit" ? "Number of nights" : "Number of days"}</h3>
                        <Input
                            className="estimatedPriceDisplay"
                            label="Number of days"
                            disabled
                            value={numberOfDays}
                        ></Input>
                    </div>
                    </div>
                    <Cats></Cats>
                </div>
                <div className={service ==="houseSit" || service==="dogWalk" || service==="daySit" ? "timeContainer noShowTime" : "timeContainer"}>
                    <h2 className="timeLabel">Please enter how many hours you require services for</h2>
                    <div className="detailsInput timeInputContainer">
                        <TextField
                            className="timeInput"
                            label="Number of hours"
                            placeholder="1"
                            type='number'
                            inputProps={{max:10, min:1}}
                            required
                            fullWidth
                            onChange={(event) => (setHours(event.target.value))}
                        ></TextField>
                    </div>
                </div>
                <div className="submitContainer">
                    <h2 className="submitLabel">Please see the estimated price below and confirm the booking</h2>
                    <div className="estimatedPriceContainer detailsInput">
                        <h3 className="estimatedPriceLabel">*Estimated price:</h3>
                        <Input
                            className="estimatedPriceDisplay"
                            label="*Estimated price:"
                            disabled
                            startAdornment={<InputAdornment position="start">R</InputAdornment>}
                            value={estimatedPrice}
                        ></Input>
                    </div>
                    <h4 className="priceEstimateNotice">*Please note that the estimated price provided may change.</h4>
                    <Button
                        type="Submit"
                        classes="button bSubmitBooking"
                        value="Confirm booking"
                        onClick={() => console.log(selectedRange, numberOfDays)}
                    ></Button>
                </div>
            </div>
            <Footer pageName="Book"></Footer>
        </div>
        </SimpleBar>
    );
}

export default Book;
