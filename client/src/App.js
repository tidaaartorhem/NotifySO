import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Notifications from "react-notify-toast";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Landing from "./components/Landing.jsx";
import Cancel from "./components/Cancel.jsx";
import Confirm from "./components/Confirm.jsx";
import Spinner from "./components/Spinner.jsx";
import StepOne from "./components/StepOne.jsx";
import StepTwo from "./components/StepTwo.jsx";
import { Router, Link } from "react-router-dom";
import Emailstep1 from "./components/emailstep1.jsx";
import Smsstep1 from "./components/Sms.jsx";
import Voicestep1 from "./components/Voice";
import history from "./history";
import Button from "react-bootstrap/Button";
import ReactBootstrap from "react-bootstrap";
import { API_URL } from "./config";
import "./App.css";

export default class App extends Component {
  // A bit of state to make sure the server is up and running before the user
  // can interact with the app.
  state = {
    loading: false
  };

  // When the component mounts, a simple GET request is made to 'wake up' the
  // server. A lot of free services like Heroku and Now.sh will put your server
  // to sleep if no one has used your application in a few minutes. Using a
  // service like uptimerobot.com to ping the server regularly can mitigate
  // sleepiness.
  componentDidMount = () => {
    // fetch(`${API_URL}/wake-up`)
    //   .then(res => res.json())
    //   .then(() => {
    //     this.setState({ loading: false });
    //   })
    //   .catch(err => console.log(err));
  };

  render = () => {
    // The 'content' function determines what to show the user based on whether
    // the server is awake or not.
    const content = () => {
      // The server is still asleep, so provide a visual cue with the <Spinner />
      // component to give the user that feedback.
      if (this.state.loading) {
        return <Spinner size="8x" spinning="spinning" />;
      }

      // The server is awake! React Router is used to either show the
      // <Landing /> component where the emails are collected or the <Confirm />
      // component where the emails are confirmed.
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/confirm/:id" component={Confirm} />
            <Route exact path="/cancel/:id" component={Cancel} />
            <Route exact path="/" component={Home} />
            <Route exact path="/landing/" component={Landing} />
            <Route exact path="/stepone" component={StepOne} />
            <Route exact path="/steptwo" component={StepTwo} />
            <Route exact path="/email/:id/:verify" component={Emailstep1} />
            <Route exact path="/voice/:id" component={Voicestep1} />
            <Route exact path="/sms/:id" component={Smsstep1} />

            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      );
    };

    return (
      // The 'container' className uses flexbox to position and center its three
      // children: <Notifications />, <main> and <Footer />
      <div>
        {/* 
          <Notifications > component from 'react-notify-toast'. This is the 
          placeholder on the dom that will hold all the feedback toast messages 
          whenever notify.show('My Message!') is called.
        */}
        {/* <Notifications /> */}

        <Container fluid className="header-bg">
          <Header />
        </Container>
        {content()}
        {/* 
          For every Medium post I write I include a demo app that uses the same 
          footer. So, I have abstracted that out to use on future posts with 
          just a couple of props passed in.
        */}
      </div>
    );
  };
}
