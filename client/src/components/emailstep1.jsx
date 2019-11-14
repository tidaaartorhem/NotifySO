import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button, FormControl } from "react-bootstrap";
import { Hosting_URL } from "../config";
import { API_URL } from "../config";
class Emailstep1 extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack() {
    this.props.history.goBack();
  }
  resend = event => {
    console.log("EMAIL");
    let verify = JSON.parse(this.props.match.params.verify);
    let temp = JSON.parse(this.props.match.params.id);
    // event.preventDefault();
    // this.setState({ sendingEmail: true });

    // Super interesting to me that you can mess with the upper and lower case
    // of the headers on the fetch call and the world does not explode.

    fetch(`${API_URL}/email`, {
      method: "post",
      mode: "cors",
      headers: {
        accept: "application/JSON",
        "content-type": "application/JSON"
      },
      body: JSON.stringify({
        email: verify.email,
        voicenumber: verify.voice,
        number: verify.number,
        emailing: temp.email,
        sms: temp.sms,
        voice: temp.voice
      })
    });
  };
  render() {
    let verifyMail = JSON.parse(this.props.match.params.verify);
    console.log(this.props.match.params);
    let temp = JSON.parse(this.props.match.params.id);
    console.log(temp);
    return (
      <Container>
        <Row>
          <Col>
            <p className="back-btn" onClick={this.goBack}>
              Back
            </p>
          </Col>
        </Row>

        {temp.email ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent a verification message to{" "}
              <span>{" " + verifyMail.email}</span>.
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">Please check your junk or spam folder.</Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the email</Row>
          </div>
        ) : (
          ""
        )}
        {temp.voicesms ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent verification messages to{" "}
              <span>{verifyMail.number + " "}</span>
              <br /> <br /> and
              <span>{" " + verifyMail.voice}</span> .
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the message.</Row>
          </div>
        ) : (
          ""
        )}
        {temp.emailvoice ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent a verification message to{" "}
              <span>{verifyMail.email + " "}</span>
              and
              <span>{" " + verifyMail.voice}</span> .
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">Please check your junk or spam folder.</Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the messages.</Row>
          </div>
        ) : (
          ""
        )}
        {temp.smsemail ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent a verification message to{" "}
              <span>{" " + verifyMail.email}</span> and
              <br /> <br />
              <span>{verifyMail.number}</span>
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">Please check your junk or spam folder.</Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the messages.</Row>
          </div>
        ) : (
          ""
        )}
        {temp.all ? (
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
                {" " + verifyMail.email + ", "}
                {verifyMail.number + " "} and
                {" " + verifyMail.voice} .
              </span>
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">Please check your junk or spam folder.</Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the messages.</Row>
          </div>
        ) : (
          ""
        )}
        {temp.voice ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent a verification message to <span>{verifyMail.voice}</span>{" "}
              .
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the message.</Row>
          </div>
        ) : (
          ""
        )}
        {temp.sms ? (
          <div className="almost">
            <Row>
              <img src="/alertyellow.png" />{" "}
            </Row>
            <Row className="head1">
              <span>One More Step</span>
            </Row>
            <Row className="para">
              We sent a verification message to
              <span>{verifyMail.number}</span>
            </Row>
            <Row className="para">
              Follow the instructions in the message to confirm your reminders.
            </Row>
            <Row className="para">
              <span>Please confirm your signup with 24 hours.</span>
            </Row>
            <Row className="back-btn">Resend the message.</Row>
          </div>
        ) : (
          ""
        )}
      </Container>
    );
  }
}
export default Emailstep1;
