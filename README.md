# GPT-3 Assistant

A dynamic application designed to facilitate conversations with OpenAI's GPT-3 model via SMS text messages. Initially, it was built to enable simple interactions using Twilio and the OpenAI API. However, it evolved into a more sophisticated tool for educational purposes.
## Features
### SMS Conversations with GPT-3
- Utilizes Twilio to send and receive SMS messages.
- Integrates with the OpenAI API to fetch completions based on SMS prompts.
### Automated Grading for Asynchronous Quizzes
- Prompts GPT-3 for completions based on student responses to quiz questions.
- Returns a graded response, comparing the student's answer to a tutor-curated answer key.
### Dynamic Prompt Generation

The application uses a unique structure to generate prompts for GPT-3, ensuring clarity and precision in the model's responses. The `generatePrompt` function sets up the question, provides an answer key, and structures the desired response format.

```javascript
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



The response structure includes:
- A rating indicating the correctness of the answer (between 0 and 1).
- A reasoning for the given rating.
- Specific feedback on the correctness of the response, areas of improvement, and aspects done well.
## Sample Response

```javascript

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
 };
```
