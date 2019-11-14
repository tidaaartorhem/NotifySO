import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import { Hosting_URL } from "../config";
class StepOne extends Component {
  constructor(props) {
    super(props);
    this.sample = [
      {
        driverlicence: "Sam",
        postalcode: "somewhere@gmail.com"
      },

      {
        driverlicence: "Ash",
        postalcode: "something@gmail.com"
      },
      {
        driverlicence: "Ash",
        postalcode: "something@gmail.com"
      },
      {
        driverlicence: "Ash",
        postalcode: "something@gmail.com"
      },
      {
        driverlicence: "Ash",
        postalcode: "something@gmail.com"
      }
    ];
    this.handleChange = this.handleChange.bind(this);

    this.goBack = this.goBack.bind(this); // i think you are missing this
  }
  goBack() {
    this.props.history.goBack();
  }
  hideOrShowLicense() {
    let licenseDisplay = !this.state.licenseDisplay;
    this.setState({ licenseDisplay });
  }
  hideOrShowRIN() {
    let rinDisplay = !this.state.rinDisplay;
    this.setState({ rinDisplay });
  }
  displayRinSection() {
    if (this.state.rinDisplay) {
      return (
        <React.Fragment>
          <Row>
            <Col>
              <p>For example, 103040304</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl className="input-text" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Your RIN will be on your vehicle permit</p>
            </Col>
          </Row>

          <img src={this.state.permitImg} alt="permit-img" />
        </React.Fragment>
      );
    } else {
      return "";
    }
  }
  handleChange(event) {
    if ((event = "")) {
    } else {
      this.setState({ value: event.target.value });
    }
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  state = {
    tem: "",
    licenseDisplay: false,
    rinDisplay: false,
    permitImg: Hosting_URL + "/permit.png",
    licenceImg: Hosting_URL + "/licence.png"
  };
  render() {
    return (
      <React.Fragment>
        <Row className="logo">
          <img width="225" height="55" src="/logoSO.png" />
        </Row>
        <Row className="Formheader">
          <span>Get reminders</span>{" "}
        </Row>
        <Row className="headtext">
          <p>
            {" "}
            When it's time to renew your <span>driver's licence </span> or
            <span> licence plate sticker</span>, we will send you a reminder 30
            days and 14 days before it expires.
          </p>
        </Row>

        <Row className="header-text">
          <Col>
            <p>Enter your information</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b>Driver’s licence number</b> (required){" "}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>For example, A1234 12345 12345</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="back-btn" onClick={() => this.hideOrShowLicense()}>
              Where do I find my licence number?
            </p>
          </Col>
        </Row>
        {this.state.licenseDisplay ? (
          <img src={this.state.licenceImg} alt="licence-img" />
        ) : (
          ""
        )}
        <Row>
          <Col>
            <FormControl
              ref={input => (this.dl = input)}
              className="input-text"
              onChange={() => {
                this.setState({ tem: this.dl.value });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="back-btn" onClick={() => this.hideOrShowRIN()}>
              No driver's licence? Enter your RIN
            </p>
          </Col>
        </Row>
        {this.displayRinSection()}
        <Row>
          <Col>
            <p>
              <b>Postal Code </b>(required)
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>For example A1A 1A1</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormControl type="text" className="input-text" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="btn btn-primary" to={"/landing/" + this.state.tem}>
              Next
            </Link>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default StepOne;
