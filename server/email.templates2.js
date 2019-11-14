const { CLIENT_ORIGIN } = require("./config");

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {
  confirm: id => ({
    subject: "ServiceOntario Email Reminders Confirmation",
    html: `
    
   
    <h1> You are signed up for ServiceOntario reminders </h1>
    <p> Thank you for signing up to receive ServiceOntario reminders for the following item(s):
    <ul><li>driver’s licence</li></ul>
    <ul><li>licence plate stickers</li></ul>
    </p>
     

    <p>  You’ll get reminders:</p>
    <ul> <li> 30 days before expiry </li> <li> 14 days before expiry </li></ul>



    
    

  <p>Need help or have questions? Contact us at help@ontario.ca</p>

  <p>If you would like to stop receiving these reminders, you can <a href='${CLIENT_ORIGIN}/cancel/${id}'>unsubscribe  </a>.</p>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/cancel/${id}`
  })
};
