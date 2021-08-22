import React, {useState, useEffect, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as emailjs from 'emailjs-com';
import $ from 'jquery';
import Button from '../button/button';
import './sendTestimonial.css';

var validator = require("email-validator");

function SendTest() {
    const nameErrorConst = "Please enter your full name";
    const emailErrorConst = "Invalid email address"
    const summaryErrorConst = "Please enter a summary sentence";
    const paragraphErrorConst = "Please enter a testimonial";

    const testNameRef = useRef(null);
    const testEmailRef = useRef(null);
    const testSummaryRef = useRef(null);
    const testParagraphRef = useRef(null);

    const [testDialog, setTestDialog] = useState(false);

    const [details, setDetails] = useState({
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        summary: "",
        summaryError: "",
        paragraph: "",
        paragraphError: ""
    });

    const clickThing = () => {
        $('.simplebar-content-wrapper')[0].scroll({top: 0, left: 0, behavior: 'smooth'});
        document.activeElement.blur();
    };

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

    const getTestDate = () => {
        let tempDate = new Date();
        let outputString = tempDate.getDate() + " " + monthNames[tempDate.getMonth()] + " " + tempDate.getFullYear();

        return outputString;
    }

    const handleSubmit = () => {
        if (details.name === "") {
            setDetails({nameError: nameErrorConst});
        }

        if ((details.email === "") || !(validator.validate(details.email))) {
            setDetails({emailError: emailErrorConst});
        }

        if (details.summary === "") {
            setDetails({summaryError: summaryErrorConst});
        }

        if (details.paragraph === "") {
            setDetails({paragraphError: paragraphErrorConst})
        }

        if (details.nameError !== "") {
            testNameRef.current.focus();
        } else if (details.emailError !== "") {
            testEmailRef.current.focus();
        } else if (details.summaryError !== "") {
            testSummaryRef.current.focus();
        } else if (details.paragraphError !== "") {
            testParagraphRef.current.focus();
        } else {

            let message = "Testimonial from " + details.name + "<br/><br/>Date:<br/>" + getTestDate() + "<br/><br/>Summary:<br/><br/>" + details.summary.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "<br/><br/><br/>Paragraph:<br/><br/>" + details.paragraph.replace(/(?:\r\n|\r|\n)/g, '<br/>');

            const templateParams = {
                from_name: details.name,
                from_email: details.email,
                to_name: 'Julia Boland',
                message_html: message
            };
            // emailjs.send(
            //     'service_tb7w78g',
            //     'template_m3tf5gl',
            //     templateParams,
            //     'user_PFWwwo3BfFxRoPtwprZCw'
            // )

            setTestDialog(true);
            setTimeout(() => {
                setTestDialog(false);
                setDetails({
                    name: "",
                    nameError: "",
                    email: "",
                    emailError: "",
                    summary: "",
                    summaryError: "",
                    paragraph: "",
                    paragraphError: ""
                });
                clickThing();
            }, 1200);
        }
    }
    return (<div className="sendTestContainer contactContainer">
        <h2 className="sendTestHeader">Please enter your details and testimonial below</h2>
        <form>
            <div className="sendTestDetailsContainer">
                <TextField inputRef={testNameRef} inputProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} InputLabelProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} FormHelperTextProps={{
                        style: {
                            fontSize: "calc(var(--inputFontSize)*0.7)"
                        }
                    }} value={details.name} placeholder="John Doe" fullWidth variant='standard' autoComplete='name' label='Full Name' onChange={(event) => {
                        if (event.target.value === "") {
                            setDetails({
                                ...details,
                                name: event.target.value,
                                nameError: nameErrorConst
                            })
                        } else {
                            setDetails({
                                ...details,
                                name: event.target.value,
                                nameError: ""
                            })
                        }
                    }} error={details.nameError !== ""} helperText={details.nameError}></TextField>
                <TextField inputRef={testEmailRef} inputProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} InputLabelProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} FormHelperTextProps={{
                        style: {
                            fontSize: "calc(var(--inputFontSize)*0.7)"
                        }
                    }} value={details.email} placeholder="johndoe@email.com" fullWidth variant='standard' autoComplete='email' label='Email' onChange={(event) => {
                        setDetails({
                            ...details,
                            email: event.target.value
                        })
                    }} onBlur={(event) => {
                        if ((event.target.value === "") || !(validator.validate(event.target.value))) {
                            setDetails({
                                ...details,
                                email: event.target.value,
                                emailError: emailErrorConst
                            })
                        } else {
                            setDetails({
                                ...details,
                                email: event.target.value,
                                emailError: ""
                            })
                        }
                    }} error={details.emailError !== ""} helperText={details.emailError}></TextField>
            </div>
            <div className="sendTestContentContainer">
                <TextField inputRef={testSummaryRef} inputProps={{
                        style: {
                            fontSize: "var(--inputFontSize)",
                            lineHeight: "var(--inputFontSize)"
                        }
                    }} InputLabelProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} FormHelperTextProps={{
                        style: {
                            fontSize: "calc(var(--inputFontSize)*0.7)"
                        }
                    }} value={details.summary} placeholder="A short sentence describing your overall experience with The HomeSitter" fullWidth variant='standard' label='Summary sentence' spellCheck multiline rows={2} autoComplete="none" onChange={(event) => {
                        if (event.target.value === "") {
                            setDetails({
                                ...details,
                                summary: event.target.value,
                                summaryError: summaryErrorConst
                            })
                        } else {
                            setDetails({
                                ...details,
                                summary: event.target.value,
                                summaryError: ""
                            })
                        }
                    }} error={details.summaryError !== ""} helperText={details.summaryError}></TextField>
                <TextField inputRef={testParagraphRef} inputProps={{
                        style: {
                            fontSize: "var(--inputFontSize)",
                            lineHeight: "var(--inputFontSize)"
                        }
                    }} InputLabelProps={{
                        style: {
                            fontSize: "var(--inputFontSize)"
                        }
                    }} FormHelperTextProps={{
                        style: {
                            fontSize: "calc(var(--inputFontSize)*0.7)"
                        }
                    }} value={details.paragraph} placeholder="A few sentences describing your interaction with The HomeSitter." fullWidth variant='standard' label='Testimonial' spellCheck multiline rows={4} autoComplete="none" onChange={(event) => {
                        if (event.target.value === "") {
                            setDetails({
                                ...details,
                                paragraph: event.target.value,
                                paragraphError: paragraphErrorConst
                            })
                        } else {
                            setDetails({
                                ...details,
                                paragraph: event.target.value,
                                paragraphError: ""
                            })
                        }
                    }} error={details.paragraphError !== ""} helperText={details.paragraphError}></TextField>
            </div>
            <Button type="Submit" classes="button bSubmit bSendTestFooter bFooterSubmit" value="Submit" onClick={handleSubmit}></Button>
        </form>
        <Dialog className="sendTestDialog" open={testDialog}>
            <h2 className="sendTestDialogTitle">Your testimonial has been sent!
                <br/><br/>
                It will be reviewed before being uploaded</h2>
        </Dialog>
    </div>);
}

export default SendTest;
