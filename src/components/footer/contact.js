import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import * as emailjs from 'emailjs-com';
import Button from '../button/button';

var validator = require("email-validator");
const nameErrorConst = "Please enter your full name";
const emailErrorConst = "Invalid email address"
const messageErrorConst = "Please enter a message";

class Contact extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "-1",
            nameError: "",
            email:"default@default.com",
            emailError:"",
            message: "-1",
            messageError:"",
            defaultName: "",
            defaultEmail:"",
            defaultMessage:"",
            open:false,
            matches: window.matchMedia("(max-width:768px)").matches
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(max-width: 768px)").addListener(handler);
    }

    handleSubmit(event) {
        document.activeElement.blur();
        if ((this.state.name !=="" && this.state.name !=="-1") &&
        (validator.validate(this.state.email) && (this.state.email !=="default@default.com")) &&
        (this.state.message !=="" && this.state.message !=="-1")){
            event.preventDefault();
            const { name, email, message } = this.state;
            const templateParams = {
              from_name: name,
              from_email: email,
              to_name: 'Julia Boland',
              message_html: message,
            };
            emailjs.send(
                'service_tb7w78g',
                'template_m3tf5gl',
                templateParams,
                'user_PFWwwo3BfFxRoPtwprZCw'
            )
            this.setState({open:true});
            this.resetForm();
        }
        else {
            if (this.state.name ==="-1"){
                this.setState({
                    name:"",
                    nameError:nameErrorConst
                })
            }
            if (this.state.message ==="-1"){
                this.setState({
                    message:"",
                    messageError:messageErrorConst
                })
            }
            if (this.state.email === "default@default.com"){
                this.setState({
                    email:"",
                    emailError:emailErrorConst
                })
            }
            if (this.state.name ==="" || this.state.name ==="-1"){
                this.nameField.focus();
            }
            else if (!validator.validate(this.state.email) || this.state.email ==="default@default.com"){
                this.emailField.focus();
            }
            else if (this.state.message ==="" || this.state.message ==="-1"){
                this.messageField.focus();
            }
        }
    };

    resetForm() {
        this.setState({
            name: "-1",
            nameError: "",
            email:"default@default.com",
            emailError:"",
            message: "-1",
            messageError:"",
            defaultName: "",
            defaultEmail:"",
            defaultMessage:""
        });

        setTimeout(() => {
            this.setState({open:false});
        }, 1200);
    }

    render(){
        return(
            <div className="contactContainer">
                <h2 className="contactHeader">Please enter your details and message below</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="contactDetailsContainer">
                    <TextField
                        inputProps={{style:{fontSize:"var(--inputFontSize)"}}}
                        InputLabelProps={{style:{fontSize:"var(--inputFontSize)"}}}
                        FormHelperTextProps={{style:{fontSize:"calc(var(--inputFontSize)*0.7)"}}}
                        inputRef={nameField => (this.nameField = nameField)}
                        value={this.state.defaultName}
                        label="Full Name"
                        fullWidth
                        variant="standard"
                        autoComplete="name"
                        placeholder="John Doe"
                        onChange={(e) => {
                            if (e.target.value === ""){
                                this.setState({name:e.target.value, nameError:nameErrorConst, defaultName:e.target.value})
                            }
                            else{
                                this.setState({name:e.target.value, defaultName:e.target.value, nameError:""})
                            }
                        }}
                        error={this.state.name === ""}
                        helperText={this.state.nameError}
                    />
                    <TextField
                        inputProps={{style:{fontSize:"var(--inputFontSize)"}}}
                        InputLabelProps={{style:{fontSize:"var(--inputFontSize)"}}}
                        FormHelperTextProps={{style:{fontSize:"calc(var(--inputFontSize)*0.7)"}}}
                        inputRef={emailField => (this.emailField = emailField)}
                        type={"email"}
                        autoComplete='email'
                        value={this.state.defaultEmail}
                        label="Email"
                        fullWidth
                        variant="standard"
                        placeholder="johndoe@email.com"
                        onChange={(e) => {
                            this.setState({defaultEmail:e.target.value})
                        }}
                        onBlur={(e) => {
                            if (!validator.validate(e.target.value)){
                                this.setState({email:e.target.value, emailError:emailErrorConst, defaultEmail:e.target.value})
                            }
                            else{
                                this.setState({email:e.target.value, defaultEmail:e.target.value, emailError:""})
                            }
                        }}
                        error={!validator.validate(this.state.email)}
                        helperText={this.state.emailError}
                        />
                    </div>
                <TextField
                    inputProps={{style:{fontSize:"var(--inputFontSize)", lineHeight:"var(--inputFontSize)"}}}
                    InputLabelProps={{style:{fontSize:"var(--inputFontSize)"}}}
                    FormHelperTextProps={{style:{fontSize:"calc(var(--inputFontSize)*0.7)"}}}
                    inputRef={messageField => (this.messageField = messageField)}
                    className="messageField"
                    value={this.state.defaultMessage}
                    label="Message"
                    spellCheck
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                    autoComplete="none"
                    onChange={(e) => {
                        if (e.target.value === ""){
                            this.setState({message:e.target.value, messageError:messageErrorConst, defaultMessage:e.target.value})
                        }
                        else{
                            this.setState({message:e.target.value, defaultMessage:e.target.value, messageError:""})
                        }
                    }}
                    error={this.state.message === ""}
                    helperText={this.state.messageError}
                    />
                <Button
                    type="Submit"
                    classes="button bSubmit bContactFooter bFooterSubmit"
                    value="Submit"
                    onClick={this.handleSubmit}
                ></Button>
                </form>
                <Dialog open={this.state.open}>
                    <h2 className="DialogTitle">Your message has been sent!</h2>
                </Dialog>
            </div>
        );
    }
}

export default Contact;
