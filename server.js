const express = require("express");
const bodyParser = require("body-parser");
const openai = require("openai");
const { MessagingResponse } = require("twilio").twml;

require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

twilio.messages
  .create({
    body: "This is my first outbound test",
    from: "+18655034813",
    to: "+17204748222",
  })
  .then((message) => console.log(message));

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.post("/sms", (req, res) => {
//   const message = req.body.Body;
//   const phoneNumber = req.body.From;

//   openai.completions.create(
//     {
//       prompt: message,
//       model: "chatbot",
//       max_tokens: 2048,
//       temperature: 0.5,
//     },
//     (err, res) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const twiml = new twilio.twim();
//       }
//     }
//   );
// });

// const port = 3000;
// const hostname = "127.0.0.1";
// app.listen(port, hostname, () => {
//   console.log(
//     `server is listening on port ${port} and host ${hostname}. http://${hostname}:${port}/sms`
//   );
// });

// const express = require("express");

// const bodyParser = require("body-parser");
// const twilio = require("twilio");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post("/sms", (req, res) => {
//   // Extract the message and phone number from the request body
//   const message = req.body.Body;
//   const phoneNumber = req.body.From;

//   // Log the message and phone number
//   console.log(`Message: ${message}`);
//   console.log(`Phone number: ${phoneNumber}`);

//   // Send a response to Twilio
//   res.send("OK");
// });

// app.listen(3000, "127.0.0.1", () => {
//   console.log("Server listening on http://127.0.0.1:3000");
// });

// const port = 3000;
// const hostname = "127.0.0.1";
// app.listen(port, hostname, () => {
//   console.log(
//     `Server listening on port ${port} at ${hostname} http://${hostname}:${port}/`
//   );
// });

// http://127.0.0.1:3000/sms
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("hello world\n");
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// // CHAT GPT3
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
