const User = require("../user.model");
const sendEmail = require("./email.send");

const templates = require("./email.templates");
const accountSid = "XXXXXXXX";
const authToken = "XXXXX";
const client = require("twilio")(accountSid, authToken);

var express = require("express");

var express = require("express");

var app = express();

// Serialize the token to a JWT string

// The callback that is invoked when the user submits the form on the client.
exports.collectEmail = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const driver = req.body.driver;
  const licence = req.body.licence;
  const number = req.body.number;
  const option = req.body.radio;
  const voicenum = req.body.voicenumber;
  console.log(number);
  User.findOne({ email, number })
    .then(user => {
      // We have a new user! Send them a confirmation email.
      User.create({ email, number, driver, licence })
        .then(newUser => {
          if (req.body.emailing && req.body.sms && req.body.voice) {
            sendEmail(
              newUser.email,
              templates.confirm(newUser._id),
              newUser.driver,
              newUser.licence
            );
            client.messages
              .create({
                body:
                  "Thank you for signing up for digital reminders from ServiceOntario. Message and data rates may apply. Reply Yes to confirm your number. Reply Stop to cancel reminders at anytime.",
                to: number, // Text this number
                from: "+16476992933" // From a valid Twilio number
              })
              .then(message => {
                console.log(message.sid);
              });
            client.calls
              .create({
                url: "http://22521ce6.ngrok.io/voice",
                to: voicenum,
                from: "+16476992933"
              })
              .then(call => console.log(call));
          } else if (req.body.emailing && req.body.sms) {
            client.messages
              .create({
                body:
                  "Thank you for signing up for digital reminders from ServiceOntario. Message and data rates may apply. Reply Yes to confirm your number. Reply Stop to cancel reminders at anytime.",
                to: number, // Text this number
                from: "+16476992933" // From a valid Twilio number
              })
              .then(message => {
                console.log(message.sid);
              });
            sendEmail(
              newUser.email,
              templates.confirm(newUser._id),
              newUser.driver,
              newUser.licence
            );
          } else if (req.body.emailing && req.body.voice) {
            sendEmail(
              newUser.email,
              templates.confirm(newUser._id),
              newUser.driver,
              newUser.licence
            );
            client.calls
              .create({
                url: "http://22521ce6.ngrok.io/voice",
                to: voicenum,
                from: "+16476992933"
              })
              .then(call => console.log(call));
          } else if (req.body.sms && req.body.voice) {
            client.calls
              .create({
                url: "http://22521ce6.ngrok.io/voice",
                to: voicenum,
                from: "+1 647 699 2933"
              })
              .then(call => console.log(call));
            client.messages
              .create({
                body:
                  "Thank you for signing up for digital reminders from ServiceOntario. Message and data rates may apply. Reply Yes to confirm your number. Reply Stop to cancel reminders at anytime.",
                to: number, // Text this number
                from: "+16476992933" // From a valid Twilio number
              })
              .then(message => {
                console.log(message.sid);
              });
          } else if (req.body.emailing) {
            sendEmail(
              newUser.email,
              templates.confirm(newUser._id),
              newUser.driver,
              newUser.licence
            );
          } else if (req.body.voice) {
            client.calls
              .create({
                url: "http://22521ce6.ngrok.io/voice",
                to: voicenum,
                from: "+16476992933"
              })
              .then(call => console.log(call));
          } else if (req.body.sms) {
            console.log("check");
            client.messages
              .create({
                body:
                  "Thank you for signing up for digital reminders from ServiceOntario. Message and data rates may apply. Reply Yes to confirm your number. Reply Stop to cancel reminders at anytime.",
                to: number, // Text this number
                from: "+16476992933" // From a valid Twilio number
              })
              .then(message => {
                console.log(message.sid).catch(err => console.log(err));
              });
          }

          // client.calls
          //   .create({
          //     url: "http://0f29292c.ngrok.io/voice",
          //     to: "+15195040098",
          //     from: "+16475609259"
          //   })
          //   .then(call => console.log(call));
        })
        .catch(err => console.log(err));

      console.log("secondcall");
      res.json({ msg: " msgs.confirm" });
    })
    .catch(err => console.log(err));

  // We have already seen this email address. But the user has not
  // clicked on the confirmation link. Send another confirmation email.
  // else if (user && !user.confirmed) {
  //   sendEmail(user.email, templates.confirm(user._id)).then(() =>
  //     res.json({ msg: msgs.resend })
  //   );
  // }

  // // The user has already confirmed this email address
  // else {
  //   res.json({ msg: msgs.alreadyConfirmed });
  // }
  // })
  // .catch(err => console.log(err));
};

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
  const { id } = req.body.email;

  // User.findById(id)
  //   .then(user => {
  //     // A user with that id does not exist in the DB. Perhaps some tricky
  //     // user tried to go to a different url than the one provided in the
  //     // confirmation email.
  //     if (!user) {
  //       res.json({ msg: msgs.couldNotFind });
  //     }

  //     // The user exists but has not been confirmed. We need to confirm this
  //     // user and let them know their email address has been confirmed.
  //     else if (user && !user.confirmed) {
  //       User.findByIdAndUpdate(id, { confirmed: true })
  //         .then(() => res.json({ msg: msgs.confirmed }))
  //         .catch(err => console.log(err));
  //     }

  //     // The user has already confirmed this email address.
  //     else {
  //       res.json({ msg: msgs.alreadyConfirmed });
  //     }
  //   })
  //   .catch(err => console.log(err));
};
