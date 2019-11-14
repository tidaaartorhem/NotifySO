const express = require("express");
const mongoose = require("mongoose");
const sendEmail = require("./email/email.send");
const templates = require("./email.templates2");
const cors = require("cors");
const accountSid = "AC5ae90d4e25eb8efb0458f349014a4d88";
const authToken = "2dd2aa99f5d60418a7d73ce27133f761";
const client = require("twilio")(accountSid, authToken);
const app = express();
const urlencoded = require("body-parser").urlencoded;
const emailController = require("./email/email.controller");
const { CLIENT_ORIGIN, DB_URL } = require("./config");
app.set("port", process.env.PORT || 8080);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const VoiceResponse = require("twilio").twiml.VoiceResponse;
var subscribed = false;
app.use(urlencoded({ extended: false }));
// Only allow requests from our client
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Allow the app to accept JSON on req.body
app.use(express.json());

// client.calls
//   .create({
//     url: "http://0f29292c.ngrok.io/voice",
//     to: "+15195040098",
//     from: "+16475609259"
//   })
//   .then(call => console.log(call));

app.post("/voice", (request, response) => {
  console.log("2345");
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say(
    "Hi you have subscribed for notification services with the government of Ontario if you want to confirm this subscription please press 1 or hangup to cancel the subscription "
  );
  twiml.gather(
    {
      numDigits: 1,
      action: "/gather"
    },
    gatherNode => {
      gatherNode.say("For sales, press 1. For support, press 2.");
    }
  );

  // If the user doesn't enter input, loop
  twiml.redirect("/voice");

  response.type("text/xml");
  response.send(twiml.toString());
});
app.post("/gather", (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case "1":
        twiml.say(
          "Thank you for confirming your sign up with the Ontario government for reminders,  regarding the Renewal of your Driver's License and license plate stickers."
        );
        break;
      case "2":
        twiml.say("You need support. We will help!");
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.").pause();
        twiml.redirect("/voice");
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect("/voice");
  }

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  response.send(twiml.toString());
});
// This endpoint is pinged every 5 mins by uptimerobot.com to prevent
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the
// componentDidMount of App.js. Once the app is confirmed to be up, we allow
// the user to perform actions on the client.
app.get("/wake-up", (req, res) => res.json("👌"));
app.get("/", (req, res) => {
  res.send("Hello World123 please!");
});
// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.

app.post("/sms", function(req, res) {
  console.log("3456789");

  const twiml = new MessagingResponse();

  // Add a text message.
  const msg = twiml.message(
    "Success! You will receive reminders 30 days and 14 days before your items expire"
  );

  // Add a picture message.

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
app.post("/email", emailController.collectEmail);
app.post("/emailconfirmation", (request, response) => {
  sendEmail(request.body.email, templates.confirm(request.body.email));
});
// Same as above, but this is the endpoint pinged in the componentDidMount of
// Confirm.js on the client.
app.get("/email/confirm/:id", emailController.confirmEmail);

// Catch all to handle all other requests that come into the app.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// To get rid of all those semi-annoying Mongoose deprecation warnings.
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

mongoose.set("useUnifiedTopology", true);
// Connecting the database and then starting the app.
mongoose
  .connect(DB_URL, options, () => {
    app.listen(app.get("port"), () => console.log("👍"));
  })
  // The most likely reason connecting the database would error out is because
  // Mongo has not been started in a separate terminal.
  .catch(err => console.log(err));
