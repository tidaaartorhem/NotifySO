import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button, FormControl } from "react-bootstrap";
import { Hosting_URL } from "../config";
import { API_URL } from "../config";
class Cancel extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack() {
    this.props.history.goBack();
  }
  resend = event => {
    console.log("EMAIL");
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
        email: temp.email,

        number: "",
        emailing: true,
        sms: false,
        voice: false
      })
    });
  };
  render() {
    return (
      <Container>
        {" "}
        <Row>
          <Col className="Formheader">
            Are you sure you want to stop reminders?
          </Col>
        </Row>
        <Row className="para">
          <Col>
            {" "}
            <p>
              {" "}
              Please note if you cancel reminders you will no longer receive any
              email reminders to {this.props.match.params.id} from Service
              Ontario for
            </p>
            <ul>
              <li>driver's licence</li>
              <li>licence plates</li>
            </ul>
          </Col>
        </Row>
        <Row className="para">
          <Col> You can sign up again at anytime.</Col>
        </Row>
        <Row>
          <Col xs={10} md={3}>
            <Button className="para">Cancel all reminders</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Cancel;
