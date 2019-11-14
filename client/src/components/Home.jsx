import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
class Home extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row className="logo">
          <img width="225" height="55" src="/logoSO.png" />
        </Row>
        <Row className="Formheader">
          <span>Get reminders</span>{" "}
        </Row>
        <Row className="headtext">
          <p style={{ "font-size": 1.125 + "rem" }}>
            {" "}
            When it's time to renew your <span>driver's licence </span> or
            <span> licence plate sticker</span>, we will send you a reminder 30
            days and 14 days before it expires.
          </p>
        </Row>

        <Row className="one-padding-bottom">
          <Col>
            <Link
              className="btn btn-primary"
              style={{ cursor: "pointer" }}
              id="btn"
              to="/landing/"
            >
              Sign up
            </Link>
          </Col>
        </Row>
        <hr />
        <Row className="header-text header-text-sm one-padding-top">
          <Col>
            <p>Before you start</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p> You need:</p>
            <ul>
              <li>driver’s licence number and/or licence plate</li>
              <li>postal code</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            Your reminders will update automatically after any driver’s licence
            or licence plate changes.
          </Col>
        </Row>
        <Row className="header-text header-text-sm ">
          <Col>
            <p>Collection of personal information</p>
          </Col>
        </Row>

        <Row className="headtext">
          <p>
            ServiceOntario uses the information you share with us to send you
            the reminders you choose in sign up.{" "}
            <span className="back-btn">Contact us</span> with questions.
          </p>
        </Row>
        <Row className="header-text header-text-sm ">
          <Col>
            <p>Stop getting reminders</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p> You can cancel reminders by:</p>
            <ul>
              <li>following the instructions in your text message </li>
              <li>
                clicking the unsubscribe link in the email you’ve been sent
              </li>
              <li>
                call 123-456-7890 if you signed up for an automated phone call
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
