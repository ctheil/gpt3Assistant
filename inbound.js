const express = require("express");
const aiHandler = require("./aiHandler");
const { MessagingResponse } = require("twilio").twiml;
const getResponse = require("./getResponse");

const app = express();
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The robots are coming!");

  res.type("text/xml").send(twmil.toString());
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// NOTE I think a cool type of integration with the LRCo system would be to prompt two messages from gtp
// The first asking if the written answer is CORRECT or INCORRECT, or use a percentage to gauge the correctness of the answer with a gradient??? -- that might be cool
// IDEA         Ask for one word or percentage then use that for visual feedback on the app, then prompt for a written explanation
// IDEA         maybe a third with highlighted points of what the student missed or what they can do better next time.
// IDEA         also might be able to ask GPT to alter and change up aspects of the questions to keep them fresh for repeat users?

const q =
  "What is the genotype of the donor cell and what is the genotype of the recipient cell? How do you know which is the donor and which is the recipient?";
const questionDiv = document.getElementById("question-div");
questionDiv.setAttribute();
const aKey =
  "The donor cell must have a fertility factor to make a sex pilus. The donor cell will have a genotype of bio+ leu+ arg+ F+ cell and the recipient cell will have a genotype of bio- leu- arg- F-.";

// const a =
//   "The genotype of the donor cell is leu+ arg- and bio+ and the genotype of the recipient cell is bio+ leu- and arg-";

// const completion = aiHandler.getChatbotResponse(q, aKey, a);
// completion.then((res) => {
//   // console.log(res.data);
//   const responseObj = res.data.choices[0];
//   console.log(responseObj);
//   const response = getResponse.extractResponse(responseObj);
//   // console.log(response.choices);
//   console.log(response);
// });

// console.log("Script has been added");
