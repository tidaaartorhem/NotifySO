const { CLIENT_ORIGIN } = require("../config");

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {
  confirm: id => ({
    subject: "ServiceOntario Email Reminders Confirmation",
    html: `<h1> Verify your email address </h1>
    <p> Please click this link to verify your email and complete sign up for ServiceOntario reminders.
    </p>
      <a href='${CLIENT_ORIGIN}/confirm/${id}'>
        https://wwww.ontario.ca/page/serviceontario/DigitalReminders/Confirmation
      </a>

    <p>  If you did not sign up for an email reminder you can:</p>
    <ul> <li> ignore this email </li> <li> let us know at help@ontario.ca </li></ul>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
};
