import React, {useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Book.css';

function Book(){
    const [service, setService] = useState('houseSit');

    const changeService = (event) =>{
        setService(event.target.value);
    };

    return(
        <div className="BookDiv">
            <Header></Header>
            <div className="BookContainer">
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
                                    className={service==="petSit" ? "serviceOption checked" : "serviceOption"}
                                    value="petSit"
                                    control={<Radio/>}
                                    label={
                                        <div className="contentWrap">
                                            <h3>Pet Sitting</h3>
                                            <h5>1 hour • R70</h5>
                                            <p>Hourly rate to watch over the dogs and cats while you're out and about, and make sure they aren't too lonely! </p>
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
                                            <p>To stop by and feed your cats or dogs instead of staying the night. I'd also stay for an hour to cuddle and play with them! </p>
                                        </div>
                                    }
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Book;
