import React, { Component } from "react";
import { Hosting_URL } from "../config";
import { Row, Col, Container } from "react-bootstrap";

class Header extends Component {
  state = {
    imgUrl: "/logo.png"
  };
  render() {
    return (
      <React.Fragment>
        <Container className="no-left-right-padding">
          <Row>
            <Col>
              <img
                src={this.state.imgUrl}
                alt="logo"
                style={{ width: 11 + "rem" }}
              />
            </Col>
            <Col>
              <div className="french-lang"> français</div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Header;
