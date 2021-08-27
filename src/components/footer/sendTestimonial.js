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

    const [sendTestimonialDetails, setSendTestimonialDetails] = useState({
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

    const handleSendTestimonialSubmit = () => {
        console.log("Clicked");
        if (sendTestimonialDetails.name === "") {
            setSendTestimonialDetails({nameError: nameErrorConst});
        }

        if ((sendTestimonialDetails.email === "") || !(validator.validate(sendTestimonialDetails.email))) {
            setSendTestimonialDetails({emailError: emailErrorConst});
        }

        if (sendTestimonialDetails.summary === "") {
            setSendTestimonialDetails({summaryError: summaryErrorConst});
        }

        if (sendTestimonialDetails.paragraph === "") {
            setSendTestimonialDetails({paragraphError: paragraphErrorConst})
        }

        if ((sendTestimonialDetails.nameError !== "") || (sendTestimonialDetails.name === "")) {
            testNameRef.current.focus();
        } else if ((sendTestimonialDetails.emailError !== "") || ((sendTestimonialDetails.email === "") || !(validator.validate(sendTestimonialDetails.email)))) {
            testEmailRef.current.focus();
        } else if ((sendTestimonialDetails.summaryError !== "") || (sendTestimonialDetails.summary === "")) {
            testSummaryRef.current.focus();
        } else if ((sendTestimonialDetails.paragraphError !== "") || (sendTestimonialDetails.paragraph === "")) {
            testParagraphRef.current.focus();
        } else {

            let message = "Testimonial from #Name#<br/>" + sendTestimonialDetails.name + "<br/>#/Name#<br/><br/>#Date#<br/>Date:<br/>" + getTestDate() + "<br/>#/Date#<br/><br/>#Summary#<br/>Summary:<br/><br/>" + sendTestimonialDetails.summary.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "<br/>#/Summary#<br/><br/><br/>#Paragraph#<br/>Paragraph:<br/><br/>" + sendTestimonialDetails.paragraph.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "<br/>#/Paragraph#";

            const templateParams = {
                from_name: sendTestimonialDetails.name,
                from_email: sendTestimonialDetails.email,
                to_name: 'Julia Boland',
                message_html: message
            };
            emailjs.send(
                'service_tb7w78g',
                'template_m3tf5gl',
                templateParams,
                'user_PFWwwo3BfFxRoPtwprZCw'
            )

            setTestDialog(true);
            setTimeout(() => {
                setTestDialog(false);
                setSendTestimonialDetails({
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
                    }} value={sendTestimonialDetails.name} placeholder="John Doe" fullWidth variant='standard' autoComplete='name' label='Full Name' onChange={(event) => {
                        if (event.target.value === "") {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                name: event.target.value,
                                nameError: nameErrorConst
                            })
                        } else {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                name: event.target.value,
                                nameError: ""
                            })
                        }
                    }} error={sendTestimonialDetails.nameError !== ""} helperText={sendTestimonialDetails.nameError}></TextField>
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
                    }} value={sendTestimonialDetails.email} placeholder="johndoe@email.com" fullWidth variant='standard' autoComplete='email' label='Email' onChange={(event) => {
                        setSendTestimonialDetails({
                            ...sendTestimonialDetails,
                            email: event.target.value
                        })
                    }} onBlur={(event) => {
                        if ((event.target.value === "") || !(validator.validate(event.target.value))) {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                email: event.target.value,
                                emailError: emailErrorConst
                            })
                        } else {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                email: event.target.value,
                                emailError: ""
                            })
                        }
                    }} error={sendTestimonialDetails.emailError !== ""} helperText={sendTestimonialDetails.emailError}></TextField>
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
                    }} value={sendTestimonialDetails.summary} placeholder="A short sentence describing your overall experience with The HomeSitter" fullWidth variant='standard' label='Summary sentence' spellCheck multiline rows={2} autoComplete="none" onChange={(event) => {
                        if (event.target.value === "") {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                summary: event.target.value,
                                summaryError: summaryErrorConst
                            })
                        } else {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                summary: event.target.value,
                                summaryError: ""
                            })
                        }
                    }} error={sendTestimonialDetails.summaryError !== ""} helperText={sendTestimonialDetails.summaryError}></TextField>
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
                    }} value={sendTestimonialDetails.paragraph} placeholder="A few sentences describing your interaction with The HomeSitter." fullWidth variant='standard' label='Testimonial' spellCheck multiline rows={4} autoComplete="none" onChange={(event) => {
                        if (event.target.value === "") {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                paragraph: event.target.value,
                                paragraphError: paragraphErrorConst
                            })
                        } else {
                            setSendTestimonialDetails({
                                ...sendTestimonialDetails,
                                paragraph: event.target.value,
                                paragraphError: ""
                            })
                        }
                    }} error={sendTestimonialDetails.paragraphError !== ""} helperText={sendTestimonialDetails.paragraphError}></TextField>
            </div>
            <Button type="Submit" classes="button bSubmit bSendTestFooter bFooterSubmit" value="Submit" onClick={handleSendTestimonialSubmit}></Button>
        <Dialog className="sendTestDialog" open={testDialog}>
            <h2 className="sendTestDialogTitle">Your testimonial has been sent!
                <br/><br/>
                It will be reviewed before being uploaded</h2>
        </Dialog>
    </div>);
}

export default SendTest;
