const express = require("express");
const bodyParser = require("body-parser");
const aiHandler = require("./aiHandler");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "chats.json"
);

const getChatsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

app.post("/message", (req, res) => {
  console.log(req.body);
  const msgFrom = req.body.From;
  const msgBody = req.body.Body;
  const interaction = {};

  if (msgBody === "START SESSION") {
    interaction.response = "Who am I speaking with? respond with NAME: ";
  } else if (msgBody.includes("NAME")) {
    const lastIndex = msgBody.lastIndexOf("NAME");
    console.log(lastIndex);
    const firstName = (interaction.user.fistName = msgBody.split());
  }
  console.log(msgBody);
  const chat = {
    from: msgFrom,
    req: msgBody,
    res: null,
    date: new Date(),
  };
  // const response = getResponse(msgBody);
  const completion = aiHandler.getChatbotResponse({ genQuestion: msgBody });
  completion.then((response) => {
    // console.log(response.data.choices[0].text);
    getChatsFromFile((chats) => {
      chat.res = response.data.choices[0].text;
      chats.push(chat);
      console.log(chats);
      fs.writeFile(p, JSON.stringify(chats), (err) => {
        console.error(err);
      });
    });
    res.send(`
    <Response>
      <Message>
        ${response.data.choices[0].text}
      </Message>
    </Response>
    `);
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
