import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as emailjs from 'emailjs-com';
import Button from '../button/button';

var validator = require("email-validator");

function SendTest(){
    const [details, setDetails] = useState({
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        summary: "",
        summaryError: "",
        paragraph: "",
        paragraphError: ""

    })
    
    return (

    );
}

export default SendTest;
