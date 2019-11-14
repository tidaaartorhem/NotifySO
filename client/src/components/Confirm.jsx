import React, { Component } from "react";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";

import { API_URL } from "../config";
import { Container } from "react-bootstrap";

export default class Confirm extends Component {
  // A bit of state to give the user feedback while their email
  // address is being confirmed on the User model on the server.
  state = {
    confirming: true
  };

  // When the component mounts the mongo id for the user is pulled  from the
  // params in React Router. This id is then sent to the server to confirm that
  // the user has clicked on the link in the email. The link in the email will
  // look something like this:
  //
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  //
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(id);

    fetch(`${API_URL}/email/confirm/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ confirming: false });
        notify.show(data.msg);
      })
      .catch(err => console.log(err));
  };

  // While the email address is being confirmed on the server a spinner is
  // shown that gives visual feedback. Once the email has been confirmed the
  // spinner is stopped and turned into a button that takes the user back to the
  // <Landing > component so they can confirm another email address.
  render = () => {
    const { id } = this.props.match.params;
    console.log(id);
    fetch(`${API_URL}/emailconfirmation`, {
      method: "post",
      mode: "cors",
      headers: {
        accept: "application/JSON",
        "content-type": "application/JSON"
      },
      body: JSON.stringify({
        email: id,
        id: "1"
      })
    });
    return (
      <Container>
        <div className="confirm">
          {this.state.confirming ? (
            <React.Fragment>
              <div className="Success">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0ZM12.8 24L4.8 16L7.056 13.744L12.8 19.472L24.944 7.328L27.2 9.6L12.8 24Z"
                    fill="#118847"
                  />
                </svg>

                <h4 className="suc one-padding-top">Success!</h4>

                <span>
                  We will send you a reminder when it’s time to renew.{" "}
                </span>

                <p>Thank you for signing up</p>
              </div>

              <p>You can cancel your reminders anytime</p>

              <Link
                to={"/cancel/" + this.props.match.params}
                className="back-btn"
              >
                Cancel reminders
              </Link>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </Container>
    );
  };
}
