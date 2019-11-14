import React, { Component } from "react";
import { notify } from "react-notify-toast";
import Spinner from "./Spinner";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Hosting_URL } from "../config";
import ReactBootstrap from "react-bootstrap";

import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import StepOne from "./StepOne";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router";

import "react-datepicker/dist/react-datepicker.css";
import {
  RadioGroup,
  ReversedRadioButton,
  RadioButton
} from "react-radio-buttons";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Form,
  FormControl,
  Container,
  Row,
  Alert,
  Button,
  Col,
  FormCheck,
  Accordion,
  Card
} from "react-bootstrap";
import Zip from "react-zipcode";
export default class Landing extends Component {
  // A bit of state to give the user feedback while their email address is being
  // added to the User model on the server.
  constructor(props) {
    super(props);
    this.verifyMail = "";
    this.goBack = this.goBack.bind(this); // i think you are missing this
    this.onSubmit = this.onSubmit.bind(this); // i think you are missing this
  }
  goBack() {
    this.props.history.goBack();
  }
  handleOnClick = () => {
    if (this.state.sms_type && this.state.voice_type && this.state.email_type) {
      let temp = { ...this.state.alert };
      temp.all = true;
      this.setState({ alert: temp });
    }
    if (
      this.state.sms_type &&
      !this.state.voice_type &&
      this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.smsemail = true;
      this.setState({ alert: temp });
    }
    if (
      this.state.sms_type &&
      this.state.voice_type &&
      !this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.voicesms = true;
      this.setState({ alert: temp });
    }
    if (
      !this.state.sms_type &&
      this.state.voice_type &&
      this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.emailvoice = true;
      this.setState({ alert: temp });
    }
    if (
      !this.state.sms_type &&
      !this.state.voice_type &&
      this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.email = true;

      this.setState({ alert: temp });
      console.log(this.state.alert.email);
    }
    if (
      this.state.sms_type &&
      !this.state.voice_type &&
      !this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.sms = true;

      this.setState({ alert: temp });
      console.log(this.state.alert.email);
    }
    if (
      !this.state.sms_type &&
      this.state.voice_type &&
      !this.state.email_type
    ) {
      let temp = { ...this.state.alert };
      temp.voice = true;

      this.setState({ alert: temp });
      console.log(this.state.alert.email);
    }
    this.setState({ redirect: true });
  };
  hideOrShowLicense() {
    let licenseDisplay = !this.state.licenseDisplay;
    this.setState({ licenseDisplay });
  }
  state = {
    redirect: false,
    what: false,
    how: false,
    fill: false,
    driver: false,
    alert: {
      email: false,
      sms: false,
      voice: false,
      all: false,
      smsemail: false,
      emailvoice: false,
      voicesms: false
    },
    driverplate: false,
    year: false,
    day: "",
    month: "",
    years: "",
    licencecheck: false,
    licenceplate: false,
    shareholders: [{ name: "" }],
    licenseDisplay: false,
    startDate: "",
    permitImg: Hosting_URL + "/permit.png",
    licenceImg: Hosting_URL + "/licence.png",
    postal: "",
    checked: true,
    radioSelected: [],
    email_type: false,
    sms_type: false,
    voice_type: false,
    dl: "",
    tem: "",
    tems: "",
    temv: "",
    licensedisabled: false,
    driverdisabled: false,
    emaildisabled: false,
    smsdisabled: false,
    voicedisabled: false,
    disable: false,
    id: {
      email: "",
      number: "",
      voice: ""
    }
  };

  handleEmailChecked = () => {
    let email_type = !this.state.email_type;
    this.setState({ email_type });
    this.setState({ how: false, emaildisabled: false });
  };
  handledriverChecked = () => {
    let driver = !this.state.driver;
    this.setState({ driver });
    this.setState({ what: false, driverdisabled: false });
  };
  handlelicenceChecked = () => {
    let licenceplate = !this.state.licenceplate;
    this.setState({ licenceplate });
    this.setState({ what: false, licensedisabled: false });
  };
  handleregx() {
    console.log(this.post.value);
  }
  handleSmsChecked = () => {
    let sms_type = !this.state.sms_type;
    this.setState({ sms_type });
    this.setState({ how: false, smsdisabled: false });
  };
  handleVoiceChecked = () => {
    let voice_type = !this.state.voice_type;
    this.setState({ voice_type });
    this.setState({ how: false, voicedisabled: false });
  };
  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };
  // disablecheck() {
  //   if (
  //     (!(this.state.id.email == "") ||
  //       !(this.state.id.number == "") ||
  //       !(this.state.id.voice == "")) &&
  //     (!this.state.shareholders[0].name == "" || !this.state.dl == "") &&
  //     !(this.year.state.value == "")
  //   ) {
  //     this.setState({ disable: false });
  //   } else {
  //     this.setState({ disable: true });
  //   }
  // }
  handlepostalcode() {
    var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    var match = regex.exec(this.state.postal);
    if (match) {
      if (
        (this.state.postal.indexOf("-") !== -1 ||
          this.state.postal.indexOf(" ") !== -1) &&
        this.state.postal.length == 7
      ) {
        this.setState({ year: false });
      } else if (
        (this.state.postal.indexOf("-") == -1 ||
          this.state.postal.indexOf(" ") == -1) &&
        this.state.postal.length == 6
      ) {
        this.setState({ year: false });
      }
    } else {
      this.setState({ year: true });
    }
  }
  checkdriver() {
    var check1 = parseInt(this.state.dl.substring(13, 15));
    var check2 = parseInt(this.state.dl.substring(15, 17));

    console.log(this.state.dl);
    if (this.state.dl === "") {
      console.log("check", this.state.dl);
      this.setState({ driverdisabled: true });
    } else if (
      ((check1 < 1 || check1 > 12) && (check1 < 51 || check1 > 62)) ||
      (check2 < 1 || check2 > 31)
    ) {
      this.setState({ driverdisabled: true });
    } else {
      this.setState({ driverdisabled: false });
    }
  }
  onSubmit = event => {
    this.verifyMail = this.state.id;
    console.log(this.state.shareholders[0].name);
    console.log(this.state.dl);

    if (
      (this.state.id.email == "" &&
        this.state.id.number == "" &&
        this.state.id.voice == "") ||
      (this.state.dl == "" && this.state.shareholders[0].name == "") ||
      this.state.postal == ""
    ) {
      if (
        !this.state.sms_type &&
        !this.state.voice_type &&
        !this.state.email_type
      ) {
        this.setState({ how: true });
      } else {
        this.setState({ how: false });
      }
      if (!this.state.driver && !this.state.licenceplate) {
        this.setState({ what: true });
      } else {
        this.setState({ what: false });
      }

      if (this.state.postal == "") {
        this.setState({ year: true });
      } else {
        this.setState({ year: false });
      }
      if (this.state.driver && this.state.dl == "") {
        this.setState({ driverdisabled: true });
      } else {
        this.setState({ driverdisabled: false });
      }
      if (this.state.licenceplate && this.state.shareholders[0].name == "") {
        this.setState({ licensedisabled: true });
      } else {
        this.setState({ licensedisabled: false });
      }
      if (this.state.email_type && this.state.id.email == "") {
        this.setState({ emaildisabled: true });
      }
      if (this.state.sms_type && this.state.id.number == "") {
        this.setState({ smsdisabled: true });
      } else {
        this.setState({ smsdisabled: false });
      }
      if (this.state.voice_type && this.state.id.voice == "") {
        this.setState({ voicedisabled: true });
      } else {
        this.setState({ voicedisabled: false });
      }
      this.setState({ fill: true });

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      return;
    } else {
      this.setState({ fill: false });
    }

    fetch(`${API_URL}/email`, {
      method: "post",

      headers: {
        accept: "application/JSON",
        "content-type": "application/JSON"
      },
      body: JSON.stringify({
        licence: this.state.shareholders[0].name,
        driver: this.state.dl,
        email: this.state.id.email,
        number: this.state.id.number,
        voicenumber: this.state.id.voice,
        emailing: this.state.email_type,
        sms: this.state.sms_type,
        voice: this.state.voice_type
      })
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    this.handleOnClick();
  };

  handledriver() {
    console.log(this.driver.textMaskInputElement.state.previousConformedValue);
    this.setState({
      dl: this.driver.textMaskInputElement.state.previousConformedValue
    });

    console.log(this.state.dl);
  }
  handlelength() {
    if (this.licence.value.length > 8 || this.licence.value.length < 2) {
      this.setState({ licensedisabled: true });
    } else {
      return this.setState({ licensedisabled: false });
    }
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };
  handleCardNumber(text) {
    var formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    //this.setState({ cardNumber: text });
    console.log(formattedText);
    return formattedText;
  }

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
    this.setState({ licensedisabled: false });
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  checkemail() {
    if (this.state.id.email == "") {
      this.setState({ emaildisabled: true });
    }
    if (!this.state.id.email.includes("@")) {
      this.setState({ emaildisabled: true });
    } else {
      this.setState({ emaildisabled: false });
    }
  }

  checknumber() {
    if (this.state.id.number == "") {
      this.setState({ smsdisabled: true });
    }
    if (!(this.state.id.number.length == 10)) {
      this.setState({ smsdisabled: true });
    } else {
      this.setState({ smsdisabled: false });
    }
  }
  checkvoice() {
    if (this.state.id.voice == "") {
      this.setState({ voicedisabled: true });
    } else {
      this.setState({ voicedisabled: false });
    }
  }
  render = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={
            "/email/" +
            JSON.stringify(this.state.alert) +
            "/" +
            JSON.stringify(this.verifyMail)
          }
        />
      );
    }

    const { sendingEmail } = this.state;

    return (
      <React.Fragment>
        <Container fluid>
          <Row className="heading-text">
            <Container className="no-left-right-padding">
              <h1 className="Formheader" style={{ "font-size": 1.25 + "rem" }}>
                ServiceOntario reminders sign up
              </h1>
            </Container>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <p style={{ "margin-top": 1 + "rem" }} onClick={this.goBack}>
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1L1.2635 4.9661C1.08786 5.11395 1.00003 5.30692 1 5.49991C0.999972 5.69295 1.0878 5.886 1.2635 6.0339L6 10"
                    stroke="#0066CC"
                    stroke-width="2"
                  />
                </svg>{" "}
                <span className="back-btn" style={{ "font-weight": 600 }}>
                  Back
                </span>
              </p>
            </Col>
          </Row>

          {this.state.alert.email ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent a verification message to{" "}
                <span>{this.verifyMail.email}</span>.
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">Please check your junk or spam folder.</Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the email</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.voicesms ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent verification messages to{" "}
                <span>{this.verifyMail.number + " "}</span>
                <br /> <br /> and
                <span>{" " + this.verifyMail.voice}</span> .
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the message.</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.emailvoice ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent a verification message to{" "}
                <span>{this.verifyMail.email + " "}</span>
                and
                <span>{" " + this.verifyMail.voice}</span> .
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">Please check your junk or spam folder.</Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the messages.</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.smsemail ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent a verification message to{" "}
                <span>{this.verifyMail.email}</span> and
                <br /> <br />
                <span>{this.verifyMail.number}</span>
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">Please check your junk or spam folder.</Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the messages.</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.all ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent verification messages to{" "}
                <span>
                  {this.verifyMail.email + ", "}
                  {this.verifyMail.number + " "} and
                  {" " + this.verifyMail.voice} .
                </span>
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">Please check your junk or spam folder.</Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the messages.</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.voice ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent a verification message to{" "}
                <span>{this.verifyMail.voice}</span> .
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the message.</Row>
            </div>
          ) : (
            ""
          )}
          {this.state.alert.sms ? (
            <div className="almost">
              <Row>
                <img src="/alertyellow.png" />{" "}
              </Row>
              <Row className="head1">
                <span>One More Step</span>
              </Row>
              <Row className="para">
                We sent a verification message to
                <span>{this.verifyMail.number}</span>
              </Row>
              <Row className="para">
                Follow the instructions in the message to confirm your
                reminders.
              </Row>
              <Row className="para">
                <span>Please confirm your signup within 24 hours.</span>
              </Row>
              <Row className="back-btn">Resend the message.</Row>
            </div>
          ) : (
            ""
          )}
          <Row className="Formheader">
            {" "}
            <p>
              Choose how you want your notification{" "}
              <span className="formside">(select at least one)</span>
            </p>
          </Row>
          {this.state.how ? (
            <Row className="margin-left">
              <Col>
                <p className="red">
                  <img width="32" height="26" src="/alerticon.png" /> Select
                  email, text message or automated phone call
                </p>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Form
            onSubmit={this.onSubmit}
            id="form1"
            ref={form => (this.form = form)}
          >
            <Row className="type">
              <Col xs={2} md={1}>
                <Checkbox onClick={() => this.handleEmailChecked()} />
              </Col>
              <Col className=" no-left-padding">
                <p className="point-two-padding-top">
                  <span> Email </span>
                  <br />
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={1}></Col>
              <Col xs={10} md={5}>
                {this.state.email_type ? (
                  <React.Fragment>
                    <Form.Group controlId="formBasicEmail">
                      <p className="placehold2">
                        For example ontariodigitalservice@gmail.com
                      </p>
                      {this.state.emaildisabled ? (
                        <React.Fragment>
                          {" "}
                          <p className="red">
                            {" "}
                            <img
                              width="32"
                              height="26"
                              src="/alerticon.png"
                            />{" "}
                            Enter an email
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                      <input
                        className="email"
                        // value={emailid}
                        // onChange={e => this.handleChange(e, index)}
                        ref={input => (this.email = input)}
                        onChange={() => {
                          let temp = { ...this.state.id };
                          temp.email = this.email.value;
                          this.setState({ id: temp });
                        }}
                        onBlur={() => this.checkemail()}
                        placeholder=""
                      />
                    </Form.Group>{" "}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="type">
              <Col xs={2} md={1}>
                <Checkbox onClick={() => this.handleSmsChecked()} />
              </Col>
              <Col className=" no-left-padding">
                <p className="point-two-padding-top">
                  {" "}
                  <span> Text message </span>
                  <br /> (standard message and data rates may apply)
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={1}></Col>
              <Col xs={10} md={5}>
                {this.state.sms_type ? (
                  <React.Fragment>
                    <Form.Group controlId="formBasicEmail">
                      <p className="placehold2">For example (226) 808-3813</p>
                      {this.state.smsdisabled ? (
                        <React.Fragment>
                          {" "}
                          <p className="red">
                            {" "}
                            <img
                              width="32"
                              height="26"
                              src="/alerticon.png"
                            />{" "}
                            Enter a number
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                      <PhoneInput
                        ref={input => (this.number = input)}
                        onChange={() => {
                          let temp = { ...this.state.id };
                          temp.number = this.number.state.value;
                          this.setState({ id: temp });
                        }}
                        onBlur={() => this.checknumber()}
                        country="CA"
                        className="email"
                        // onBlur={() => this.checknumber()}
                      />
                    </Form.Group>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="type">
              <Col xs={2} md={1}>
                <Checkbox onClick={() => this.handleVoiceChecked()} />
              </Col>
              <Col className=" no-left-padding">
                <p className="point-two-padding-top">
                  {" "}
                  Automated <span> phone call </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={1}></Col>
              <Col xs={10} md={5}>
                {this.state.voice_type ? (
                  <React.Fragment>
                    <Form.Group controlId="formBasicEmail">
                      <p className="placehold2">For example (226) 808-3813</p>
                      {this.state.voicedisabled ? (
                        <React.Fragment>
                          {" "}
                          <p className="red">
                            {" "}
                            <img
                              width="32"
                              height="26"
                              src="/alerticon.png"
                            />{" "}
                            Enter a number
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                      <PhoneInput
                        ref={input => (this.voice = input)}
                        onChange={() => {
                          let temp = { ...this.state.id };
                          temp.voice = parseInt(this.voice.state.value);
                          this.setState({ id: temp });
                        }}
                        onBlur={() => this.checkvoice()}
                        country="CA"
                        className="email"
                        // onBlur={() => this.checkvoice()}
                      />
                    </Form.Group>{" "}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="Formheader">
              <p>
                Choose what you want reminders for{" "}
                <span className="formside">(select at least one)</span>
              </p>
            </Row>
            {this.state.what ? (
              <Row className="margin-left">
                <Col>
                  <p className="red">
                    <img width="32" height="26" src="/alerticon.png" /> Select
                    driver’s licence or licence plate reminders
                  </p>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <React.Fragment>
              {" "}
              <Row className="type">
                <Col xs={2} md={1}>
                  <Checkbox onClick={() => this.handledriverChecked()} />
                </Col>
                <Col className=" no-left-padding">
                  <p className="point-two-padding-top">
                    <span> Driver's licence </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={2} md={1}></Col>
                <Col xs={10} md={5}>
                  {this.state.driver ? (
                    <React.Fragment>
                      <Row>
                        <Col>
                          <p className="placehold">
                            For example A1234 12345 11111
                          </p>
                        </Col>
                      </Row>
                      {this.state.driverdisabled ? (
                        <React.Fragment>
                          {" "}
                          <p className="red">
                            {" "}
                            <img
                              width="32"
                              height="26"
                              src="/alerticon.png"
                            />{" "}
                            Enter a valid driver licence number
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}{" "}
                      <Row>
                        <Col>
                          <MaskedInput
                            ref={input => (this.driver = input)}
                            id="driver"
                            onChange={() => {
                              let temp = this.driver.textMaskInputElement.state
                                .previousConformedValue;

                              this.setState({ dl: temp });
                            }}
                            onBlur={() => this.checkdriver()}
                            id="dl"
                            mask={[
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              " ",
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              " ",
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,
                              /[A-Za-z0-9]/,

                              /[A-Za-z0-9]/
                            ]}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p
                            className="where"
                            onClick={() => this.hideOrShowLicense()}
                          >
                            Where do I find my licence number?{" "}
                            {this.state.licenseDisplay ? (
                              <svg
                                width="14"
                                height="9"
                                viewBox="0 0 14 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 7L6.40678 2.2635C6.57106 2.08786 6.78547 2.00003 6.9999 2C7.21439 1.99997 7.42889 2.0878 7.59322 2.2635L12 7"
                                  stroke="black"
                                  stroke-width="3"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.98636 1L6.39915 6.096C6.56365 6.28497 6.77836 6.37947 6.99307 6.3795C7.20786 6.37953 7.42265 6.28503 7.58721 6.096L12 1"
                                  stroke="black"
                                  stroke-width="3"
                                />
                              </svg>
                            )}
                            {this.state.licenseDisplay ? (
                              <img
                                style={{
                                  "margin-top": 1 + "rem",
                                  width: 15 + "rem"
                                }}
                                src={this.state.licenceImg}
                                alt="licence-img"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </Col>
                      </Row>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row className="subhead">
                <Col xs={2} md={1}>
                  <Checkbox onClick={() => this.handlelicenceChecked()} />
                </Col>
                <Col className=" no-left-padding">
                  <p className="point-two-padding-top">
                    <span> Licence plate</span>
                    <div>
                      {" "}
                      (not available for fleet or commercial vehicles yet)
                    </div>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={2} md={1}></Col>
                <Col xs={10} md={5}>
                  {this.state.licenceplate ? (
                    <React.Fragment>
                      <Row>
                        <Col>
                          <p className="placehold">For example 000SAM</p>
                        </Col>
                      </Row>
                      {this.state.licensedisabled ? (
                        <React.Fragment>
                          {" "}
                          <p className="red">
                            {" "}
                            <img
                              width="32"
                              height="26"
                              src="/alerticon.png"
                            />{" "}
                            Enter a valid licence plate number
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}{" "}
                      <Row className="share">
                        <Col>
                          {this.state.shareholders.map((shareholder, idx) => (
                            <React.Fragment>
                              <Row>
                                <Col cols={11}>
                                  <div className="shareholder">
                                    <input
                                      ref={input => (this.licence = input)}
                                      value={shareholder.name}
                                      onBlur={() => this.handlelength()}
                                      onChange={this.handleShareholderNameChange(
                                        idx
                                      )}
                                      className="email"
                                    />
                                  </div>{" "}
                                </Col>
                                <Col cols={1}>
                                  {idx > 0 ? (
                                    <svg
                                      className="removeicon"
                                      onClick={this.handleRemoveShareholder(
                                        idx
                                      )}
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 0C4.03754 0 0 4.03719 0 9C0 13.9628 4.03754 18 9 18C13.9625 18 18 13.9628 18 9C18 4.03719 13.9625 0 9 0ZM13.3269 9.69231H9.69231H9C9 10 9 10 9 9.69231C8.5 9.69231 8.5 10.0745 8.5 9.69231H8.30769H4.67308C4.29092 9.69231 3.98077 9.38215 3.98077 9C3.98077 8.61785 4.29092 8.30769 4.67308 8.30769H8.30769C9.69231 8.30769 8.61785 8.30769 9 8.30769C9.38215 8.30769 9.69231 7.92554 9.69231 8.30769H13.3269C13.7091 8.30769 14.0192 8.61785 14.0192 9C14.0192 9.38215 13.7091 9.69231 13.3269 9.69231Z"
                                        fill="black"
                                      />
                                    </svg>
                                  ) : (
                                    ""
                                  )}
                                </Col>
                              </Row>
                            </React.Fragment>
                          ))}
                        </Col>
                      </Row>
                      <Row onClick={() => this.handleAddShareholder()}>
                        <Col className="addlink">
                          {" "}
                          <p>
                            <svg
                              className="add"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 0C4.03754 0 0 4.03719 0 9C0 13.9628 4.03754 18 9 18C13.9625 18 18 13.9628 18 9C18 4.03719 13.9625 0 9 0ZM13.3269 9.69231H9.69231V13.5C9.69231 13.8822 9.38215 14.1923 9 14.1923C8.61785 14.1923 8.30769 13.8822 8.30769 13.5V9.69231H4.67308C4.29092 9.69231 3.98077 9.38215 3.98077 9C3.98077 8.61785 4.29092 8.30769 4.67308 8.30769H8.30769V4.84615C8.30769 4.464 8.61785 4.15385 9 4.15385C9.38215 4.15385 9.69231 4.464 9.69231 4.84615V8.30769H13.3269C13.7091 8.30769 14.0192 8.61785 14.0192 9C14.0192 9.38215 13.7091 9.69231 13.3269 9.69231Z"
                                fill="black"
                              />
                            </svg>
                            add another licence plate
                          </p>
                        </Col>
                      </Row>{" "}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </React.Fragment>
            <Row className="Formheader">
              <p>
                Enter your postal <code></code>{" "}
                <span className="formside">(required)</span>
              </p>
            </Row>
            <Row>
              <Col>
                <p className="place">For example N2B 3A1</p>
              </Col>
            </Row>
            {this.state.year ? (
              <Row>
                <p className="red" style={{ "margin-left": 1 + "rem" }}>
                  {" "}
                  <img width="32" height="26" src="/alerticon.png" /> Enter a
                  valid postal code
                </p>
              </Row>
            ) : (
              ""
            )}
            <Row>
              <Col md={5}>
                <input
                  className="email"
                  id="postal"
                  ref={input => (this.postal = input)}
                  onChange={() => {
                    let temp = this.postal.value;

                    this.setState({ postal: temp });
                  }}
                  onBlur={() => this.handlepostalcode()}
                />
              </Col>
            </Row>

            <Row className="margintop">
              <Col>
                By clicking the “Submit” button, you agree to the{" "}
                <span className="back-btn">Terms and Conditions</span> and{" "}
                <span className="back-btn">privacy policy.</span>
              </Col>
            </Row>

            <Button onClick={() => this.onSubmit()} className="butt">
              Submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  };
}
