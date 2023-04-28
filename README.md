# gpt3Assistant

This playground application started as a project to enable conversations with GPT vis SMS text message. It utilizes Twillio and the OpenAI API to requetst completions based on SMS prompts.

It then morphed into a professional playground that prompts GPT for completions based on student responses to async quiz questions, and returns a \
type of graded response based on a tutors currated asnwer to the initial question. The structure for the initial prompt and the requested response format
was very fun to develop:

```js
const generatePrompt = (q, aKey, res) => {
  //Generates the initial instructions and sets up the question
  const qInstructions = "Given the question: \n";
  // provides the answer key GPT will reference
  // this will be provide and curated by the SL Leader
  const aKeyInstructions = "\n and this answer key: \n";
  // sets up the response wanted from chatGPT. 
  // Asks for an initial FLOAT to determine the correctness of the answer in percentage
  // then asks for a general explanation of the answer
  // then provides feedback as to why the response was correct or incorrect, 
  // and what went well vs poorly.
  const resInstructions =
    "\n provide in the first message the correctness of this response with a floating point value between 0 and 1 
    like this '<rating>0.5</rating>'. 
    In a second message provide an explanation as to why you rated the response with that value 
    like this '<reasoning>your response</reasoning>'. 
    Finally in a third message, provide specific feedback as to why the response was correct or incorrect, 
    what could be improved and/or what was done well like this '<critique>your critique</critique>'   \n";

  // concats everything into string and adds quotes around dynamic elements
  // to differentiate between talking directly to GPT and plugging in info. 
  // Commands are left unquoted and data-to-analyze is quoted.
  const string =
    qInstructions +
    `"${q}"` +
    aKeyInstructions +
    `"${aKey}"` +
    resInstructions +
    `"${res}"`;
  return string;
};
```

```js
const res = {
   text:
     "\n" +
     "\n" +
     "<rating>0.67</rating>\n" +
     "<reasoning>The given answer does not provide the correct genotypes 
     for the donor and recipient cells.</reasoning>\n" +
     "<critique>The genotype of the donor cell should be bio+ leu+ arg+ F+ 
     and the genotype of the recipient cell should be bio- leu- arg- F-. 
     The donor cell must have a fertility factor to make a sex pilus, 
     so the genotypes must include the F+ factor.</critique>",
   index: 0,
   logprobs: null,
   finish_reason: "stop",
 }
```
