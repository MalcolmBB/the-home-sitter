import React, { useState, useEffect } from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Button from "../../button/button";

// Other imports
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// CSS imports
import "./AdminTestimonials.css";

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function AdminTestimonials() {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [pasteEmail, setPasteEmail] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <SimpleBar
      className="MainPageDiv"
      style={{ height: "100vh" }}
      forceVisible="y"
      autoHide={false}
    >
      <div className="AdminTestimonialsDiv">
        <Header></Header>
        <div className="AdminTestimonialsContainer">
          <h1 className="AdminTestimonialsHeader">Upload Testimonials</h1>
          {loggedIn === false
            ?
            <div className="AdminLogin">
                <h3 className="AdminLoginPrompt">Please log in to continue</h3>
                <TextField
                  className="adminUsernameInput"
                  label="Username"
                  placeholder="John Doe"
                  required
                  fullWidth
                  value={adminDetails.username}
                  onChange={(event) => {
                    setAdminDetails({
                      ...adminDetails,
                      username: event.target.value,
                    });
                  }}
                  error={adminDetails.usernameError !== ""}
                  helperText={adminDetails.usernameError}
                ></TextField>
                <TextField
                  className="adminPasswordInput"
                  label="Password"
                  placeholder="*********"
                  required
                  fullWidth
                  value={adminDetails.password}
                  onChange={(event) => {
                    setAdminDetails({
                      ...adminDetails,
                      password: event.target.value,
                    });
                  }}
                  error={adminDetails.passwordError !== ""}
                  helperText={adminDetails.passwordError}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button
                    type="Submit"
                    classes={"bAdminLoginSubmit"}
                    onClick={() => {setLoggedIn(true)}}
                    value="Log in"
                ></Button>
            </div>
            :
            <div className="EnterTestimonial">
                <div className="TabSelection">
                    <Button
                        type="Submit"
                        classes={pasteEmail === true ? "bTabSelection bPasteEmail" : "bTabSelection bPasteEmail bInactiveTabSelection"}
                        onClick={() => {console.log("Hello");}}
                        value="Paste email"
                    ></Button>
                    <Button
                        type="Submit"
                        classes={pasteEmail === false ? "bTabSelection bEnterDetails" : "bTabSelection bEnterDetails bInactiveTabSelection"}
                        onClick={() => {console.log("Hello");}}
                        value="Enter manually"
                    ></Button>
                </div>
                <div className="TabView">
                    <div className="pasteEmail">
                        <h4 className="pasteEmailHeading">Paste the contents of the email here</h4>
                        <TextField className="pasteEmailInput" label="Paste here" multiline rows={4} fullWidth
                        ></TextField>
                        <Button
                            type="Submit"
                            classes={"bPasteEmailSubmit bAdminLoginSubmit"}
                            onClick={() => {setPasteEmail(!pasteEmail)}}
                            value="Extract details"
                        ></Button>
                    </div>
                </div>
            </div>
}

        </div>
        <Footer></Footer>
      </div>
    </SimpleBar>
  );
}

export default AdminTestimonials;
