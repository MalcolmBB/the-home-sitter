import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


function MyIcon({name=null, link, style}){
    if (name === null){
        name = getNameFromLink(link);
    }

    switch (name) {
        case "Instagram":
            return (<InstagramIcon style={style}/>);
        case "Github":
            return (<GitHubIcon style={style}/>);
        case "Linkedin":
            return (<LinkedInIcon style={style}/>);
        case "Email":
            return (<MailOutlineIcon style={style}/>);
        case "Facebook":
            return (<FacebookIcon style={style}/>);
        case "Whatsapp":
            return (<WhatsAppIcon style={style}/>);
        case "Close":
            return (<CloseRoundedIcon style={style}/>);
        default:
            return null;
    }
}

function getNameFromLink(link){
    var tempName;
    tempName = link.replace(/.+\/\/|www.|api.|\..+/g, '');
    tempName = tempName.charAt(0).toUpperCase() + tempName.slice(1);
    return tempName;
}

export default MyIcon;
