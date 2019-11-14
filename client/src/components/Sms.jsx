import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, FormControl, Container } from "react-bootstrap";
import { Hosting_URL } from "../config";

class Smsstep1 extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <React.Fragment>
        <div className="banner">
          <Row className="Dig">Digital notifications </Row>
          <Row className="dig">Step 3 of 3 </Row>
        </div>
        <Row>
          <p className="back-btn" onClick={this.goBack}>
            Back
          </p>
        </Row>
        <Container>
          <Row className="Badge">
            <div>
              One more step! We sent a verification message to
              <span> {this.props.match.params.id}</span> . You should receive it
              in the next 2 minutes.
            </div>
            <div>
              Follow the instructions in the text messages to verify that this
              is your phone number.
            </div>
            <div>
              Didn’t get a text?<p>Resend the text message.</p>
            </div>
          </Row>

          <Row className="head1">Your Subscription</Row>

          <Row className="head2">Phone Number</Row>
          <Row>
            <Col>{this.props.match.params.id}</Col>
            <Col>edit</Col>
          </Row>

          <Row className="head2">Driver's licence text notifications</Row>

          <p>Driver's license number:</p>
          <p> {this.props.match.params.dl}</p>
          <span>expiry 02/2020</span>
          <ul>
            <li>2 weeks before expiry</li>
            <li>1 month before expiry</li>
          </ul>

          <Row className="head2">Licence place sticker text notifications</Row>

          <p>License plate:</p>
          <p> ****808</p>
          <span>expiry 04/2020</span>
          <ul>
            <li>2 weeks before expiry</li>
            <li>1 month before expiry</li>
          </ul>
        </Container>
      </React.Fragment>
    );
  }
}
export default Smsstep1;
