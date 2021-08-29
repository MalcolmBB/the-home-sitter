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
import * as Realm from "realm-web";

// CSS imports
import "./AdminTestimonials.css";

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

var passwordHash = require("password-hash");
const assert = require("assert");

const USERNAME_ERROR = "Invalid username or password";
const PASSWORD_ERROR = "Invalid password";

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

  const [testDetails, setTestDetails] = useState({
    name: "",
    nameError: "",
    date: "",
    dateError: "",
    summary: "",
    summaryError: "",
    paragraph: "",
    paragraphError: "",
  });

  const [pasteValue, setPasteValue] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const extractDetailsFromEmail = () => {
    const NameRegex = /((#Name#[\n\s]*)(?<name>[a-zA-Z]+)[\n\s].*[\n\s]*#\/Name#)/;
    const DateRegex = /((#Date#[\n\s]*Date:[\n\s]*)(?<date>.+)[\n\s]*#\/Date#)/;
    const SummaryRegex = /((#Summary#[\n\s]Summary:[\n\s]{2})(?<summary>[\d\D]+)[\n\s]#\/Summary#)/;
    const ParagraphRegex = /((#Paragraph#[\n\s]Paragraph:[\n\s]{2})(?<paragraph>[\d\D]+)[\n\s]#\/Paragraph#)/;

    let nameResult = "";
    let dateResult = "";
    let summaryResult = "";
    let paragraphResult = "";

    if ((nameResult = NameRegex.exec(pasteValue)) !== null) {
      nameResult = nameResult.groups.name;
    }

    if ((dateResult = DateRegex.exec(pasteValue)) !== null) {
      dateResult = dateResult.groups.date;
    }

    if ((summaryResult = SummaryRegex.exec(pasteValue)) !== null) {
      summaryResult = summaryResult.groups.summary;
    }

    if ((paragraphResult = ParagraphRegex.exec(pasteValue)) !== null) {
      paragraphResult = paragraphResult.groups.paragraph;
    }

    setTestDetails({
      name: nameResult,
      date: dateResult,
      summary: summaryResult,
      paragraph: paragraphResult,
      nameError: "",
      dateError: "",
      summaryError: "",
      paragraphError: "",
    });

    setPasteValue("");

    setPasteEmail(false);
  };

  const React_App_ID = "thehomesitter-ainwl";
  const app = new Realm.App({ id: React_App_ID });

  async function loginCustomFunction(payload) {
    // Create a Custom Function credential
    const credentials = Realm.Credentials.function(payload);
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      assert(user.id === app.currentUser.id);
      setLoggedIn(true);
      return user;
    } catch (err) {
        if (err.message.includes("Invalid username")){
            setAdminDetails({
                username: "",
                usernameError: USERNAME_ERROR,
                password: "",
                passwordError: USERNAME_ERROR
            })
        }
        else if (err.message.includes("Invalid password")){
            setAdminDetails({
                ...adminDetails,
                password: "",
                passwordError: PASSWORD_ERROR
            })
        }
        else {
            console.error("Failed to log in", err);
        }
    }
  }

  // loginCustomFunction({ username: "JuliaBolandAdmin" , password :"JuliaBoland1999"}).then((user) => {
  //   console.log("Successfully logged in!", "JuliaBoland1999");
  // });

  const handleAdminLogin = () => {
    loginCustomFunction({
      username: adminDetails.username,
      password: adminDetails.password,
    });
  };

  async function sendData(newSubmit) {
    const client = app.currentUser.mongoClient("mongodb-atlas");
    const TestText = client.db("TheHomeSitter").collection("Testimonials");
    TestText.insertOne(newSubmit)
      .then((result) => {
        console.log(`Successfully inserted item`);
        setTestDetails({
            name: "",
            date: "",
            summary: "",
            paragraph: "",
            nameError: "",
            dateError: "",
            summaryError: "",
            paragraphError: "",
        });
        document.activeElement.blur();
        }
      )
      .catch((err) => console.error(`Failed to insert item: ${err}`));
  };

  const handleTestimonialSubmit = () => {
    const paragraphArray = testDetails.paragraph.split("\n");

    if (paragraphArray[paragraphArray.length - 1] === "") {
      paragraphArray.pop();
    }

    const newSubmit = {
      date: testDetails.date,
      name: testDetails.name,
      summary: testDetails.summary,
      type: "Empty",
      paragraph: paragraphArray,
    };

    sendData(newSubmit);

    setTestDetails({
      name: "",
      date: "",
      summary: "",
      paragraph: "",
      nameError: "",
      dateError: "",
      summaryError: "",
      paragraphError: "",
    });
  };

  return (
    <SimpleBar
      className="MainPageDiv"
      style={{
        height: "100vh",
      }}
      forceVisible="y"
      autoHide={false}
    >
      <div className="AdminTestimonialsDiv">
        <Header></Header>
        <div className="AdminTestimonialsContainer">
          <h1 className="AdminTestimonialsHeader">Upload Testimonials</h1>
          {loggedIn === false ? (
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
                    usernameError: ""
                  });
                }}
                error={adminDetails.usernameError !== ""}
                helperText={adminDetails.usernameError}
              ></TextField>
              <TextField
                className="adminPasswordInput"
                label="Password"
                required
                fullWidth
                value={adminDetails.password}
                onChange={(event) => {
                  setAdminDetails({
                    ...adminDetails,
                    password: event.target.value,
                    passwordError: ""
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
                onClick={() => {
                  handleAdminLogin();
                }}
                value="Log in"
              ></Button>
            </div>
          ) : (
            <div className="EnterTestimonial">
              <div className="TabSelection">
                <Button
                  type="Submit"
                  classes={
                    pasteEmail === true
                      ? "bTabSelection bPasteEmail"
                      : "bTabSelection bPasteEmail bInactiveTabSelection"
                  }
                  onClick={() => {
                    setPasteEmail(true);
                  }}
                  value="Paste email"
                ></Button>
                <Button
                  type="Submit"
                  classes={
                    pasteEmail === false
                      ? "bTabSelection bEnterDetails"
                      : "bTabSelection bEnterDetails bInactiveTabSelection"
                  }
                  onClick={() => {
                    setPasteEmail(false);
                  }}
                  value="Enter manually"
                ></Button>
              </div>
              <div className="TabView">
                <div
                  className={
                    pasteEmail === true ? "pasteEmail activeTab" : "pasteEmail"
                  }
                >
                  <h4 className="pasteEmailHeading">
                    Paste the contents of the email here
                  </h4>
                  <TextField
                    className="pasteEmailInput"
                    label="Paste here"
                    multiline
                    rows={4}
                    fullWidth
                    value={pasteValue}
                    onChange={(event) => {
                      setPasteValue(event.target.value);
                    }}
                  ></TextField>
                  <Button
                    type="Submit"
                    classes={"bPasteEmailSubmit bAdminLoginSubmit"}
                    onClick={() => {
                      extractDetailsFromEmail();
                    }}
                    value="Extract details"
                  ></Button>
                </div>
                <div
                  className={
                    pasteEmail === false
                      ? "enterDetails activeTab"
                      : "enterDetails"
                  }
                >
                  <h4 className="enterDetailsHeading">
                    Enter the details of the testimonial here
                  </h4>
                  <TextField
                    className="enterDetailsName"
                    label="Name"
                    fullWidth
                    value={testDetails.name}
                    onChange={(event) => {
                      if (event.target.value !== "") {
                        setTestDetails({
                          ...testDetails,
                          name: event.target.value,
                          nameError: "",
                        });
                      } else {
                        setTestDetails({
                          ...testDetails,
                          name: event.target.value,
                        });
                      }
                    }}
                    error={testDetails.nameError !== ""}
                    helperText={testDetails.nameError}
                  ></TextField>
                  <TextField
                    className="enterDetailsDate"
                    label="Date"
                    fullWidth
                    value={testDetails.date}
                    onChange={(event) => {
                      if (event.target.value !== "") {
                        setTestDetails({
                          ...testDetails,
                          date: event.target.value,
                          dateError: "",
                        });
                      } else {
                        setTestDetails({
                          ...testDetails,
                          date: event.target.value,
                        });
                      }
                    }}
                    error={testDetails.dateError !== ""}
                    helperText={testDetails.dateError}
                  ></TextField>
                  <TextField
                    className="enterDetailsSummary"
                    label="Summary"
                    fullWidth
                    multiline
                    value={testDetails.summary}
                    onChange={(event) => {
                      if (event.target.value !== "") {
                        setTestDetails({
                          ...testDetails,
                          summary: event.target.value,
                          summaryError: "",
                        });
                      } else {
                        setTestDetails({
                          ...testDetails,
                          summary: event.target.value,
                        });
                      }
                    }}
                    error={testDetails.summaryError !== ""}
                    helperText={testDetails.summaryError}
                  ></TextField>
                  <TextField
                    className="enterDetailsParagraph"
                    label="Paragraph"
                    fullWidth
                    multiline
                    value={testDetails.paragraph}
                    onChange={(event) => {
                      if (event.target.value !== "") {
                        setTestDetails({
                          ...testDetails,
                          paragraph: event.target.value,
                          paragraphError: "",
                        });
                      } else {
                        setTestDetails({
                          ...testDetails,
                          paragraph: event.target.value,
                        });
                      }
                    }}
                    error={testDetails.paragraphError !== ""}
                    helperText={testDetails.paragraphError}
                  ></TextField>
                  <Button
                    type="Submit"
                    classes={"bEnterDetailsSubmit bAdminLoginSubmit"}
                    onClick={() => {
                      handleTestimonialSubmit();
                    }}
                    value="Confirm and Submit"
                  ></Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer></Footer>
      </div>
    </SimpleBar>
  );
}

export default AdminTestimonials;
