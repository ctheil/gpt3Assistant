const msg = "Hello chatGpt, how are you doing?";
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("The Robots are Coming!");

  res.type("text/xml").send(twmil.toString());
});
app.listen(port, () => {
  console.log(`The server has started at http://localhost:${port}`);
});

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const generatePrompt = (q, aKey, res) => {
  //Generates the initial instructions and sets up the question
  const qInstructions = "Given the question: \n";
  // provides the answer key GPT will reference -- this will be provide and curated by the SL Leader
  const aKeyInstructions = "\n and this answer key: \n";
  // sets up the response wanted from chatGPT. Asks for an initial FLOAT to determine the correctness of the answer in percentage
  // then asks for a general explanation of the answer
  // then provides feedback as to why the response was correct or incorrect, and what went well vs poorly.
  const resInstructions =
    "\n provide in the first message the correctness of this response with a floating point value between 0 and 1 like this '<rating>0.5</rating>'. In a second message provide an explanation as to why you rated the response with that value like this '<reasoning>your response</reasoning>'. Finally in a third message, provide specific feedback as to why the response was correct or incorrect, what could be improved and/or what was done well like this '<critique>your critique</critique>'   \n";

  // concats everything into string and adds quotes around dynamic elements to differentiate between talking directly to GPT and plugging in info. Commands are left unquoted and data-to-analyze is quoted.
  const string =
    qInstructions +
    `"${q}"` +
    aKeyInstructions +
    `"${aKey}"` +
    resInstructions +
    `"${res}"`;
  return string;
};

async function getChatbotResponse(props) {
  // Use the OpenAI API to generate a response
  const { q, aKey, a, genQuestion } = props;
  let prompt = null;
  if (q == null || aKey == null || a == null) {
    prompt = genQuestion;
  } else {
    prompt = generatePrompt(q, aKey, a); // Generates the prompt via the fn above with guidelines on how to respond
  }
  try {
    // BUG // need to fix response to not act as a completion
    // FIXME // GTP tries to complete the phrase or something and I need more of a conversation
    // REPLACE  // should also look into various models of GPT IDEA checkout other variants outside of DAVINCI based on cost and type of response
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      // prompt: `Given this question \n ${q} \n and this answer key \n ${aKey} \n rate the correctness of this response and why in a college level of understanding \n ${a}`,
      prompt: prompt,
      // temperature: 0.5,
      temperature: 0.7,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // res.status(200).json({ result: completion.data.choices[0].text }); // FIXME should prolly send a statusCode, but will worry in prod build

    return response;
  } catch (err) {
    console.error(err); // BUG also need better err handling
  }
}

exports.getChatbotResponse = getChatbotResponse;

// CLEANUP
// either way it returns an error on the openai.completions.create({}) call specifying the BUG in .create
// chatgpt was no help in figuring out this bug nor in helping fix the broken local server webhook connection to twilio. Should fix the api call first since that is more applicable outside of this application, then fix the twilio connection so that I am more versed in js for email and sms.
// NOTE want to eventually be able to use cloud fns to request the registration for LRCo and enable that registration temporarily by remote access/remote grant by emailing an admin, quick button press to enable registration for a small amount of time for varified email. -- means the user will enter their email in the request, if admin grants permission then registration for only that email will go live for 2-5minutes. Maybe even show a countdown on login screen for new register user.
