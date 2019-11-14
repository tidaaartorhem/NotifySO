import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, FormControl } from "react-bootstrap";
class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }
  goBack() {
    this.props.history.goBack();
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="banner">
          <Row className="Dig">Digital notifications </Row>
          <Row className="dig">Step 2 of 3 </Row>
        </div>
        <Row>
          <Col>
            <p className="back-btn" onClick={this.goBack}>
              Back
            </p>
          </Col>
        </Row>
        <Row className="header-text">
          <Col>
            <p> You will receive reminders for your</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              <li>
                <b>Driver’s licence </b> <br /> ***** ***** 59204
              </li>
              <li>
                <b>Licence plate sticker </b> <br />
                Yellow, 1999 Honda
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <span className="header-text">
                Choose how you want your notification
              </span>
              <span>(required)</span>
            </p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default StepTwo;
