exports.PORT = 8080;

// exports.CLIENT_ORIGIN = "http://localhost:3000"; //Staging
// process.env.NODE_ENV === "production"
//   ? process.env.CLIENT_ORIGIN
//   : "http://localhost:3000";

exports.CLIENT_ORIGIN = "https://notify-service-ontario.firebaseapp.com"; //Prod
exports.DB_URL =
  "mongodb+srv://Mir:Ontario123@digitalfamilylawrecord-bdwhj.mongodb.net/test";

// process.env.NODE_ENV === "production"
//   ? process.env.DB_URL
//   : "mongodb+srv://testing:opskitchener@cluster0-6vddg.mongodb.net/test?retryWrites=true&w=majority";
