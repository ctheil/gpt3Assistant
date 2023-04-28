# gpt3Assistant

This playground application started as a project to enable conversations with GPT vis SMS text message. It utilizes Twillio and the OpenAI API to requetst completions based on SMS prompts.

It then morphed into a professional playground that prompts GPT for completions based on student responses to async quiz questions, and returns a \
type of graded response based on a tutors currated asnwer to the initial question. The structure for the initial prompt and the requested response format
was very fun to develop:

```
const res = {
   text:
     "\n" +
     "\n" +
     "<rating>0.67</rating>\n" +
     "<reasoning>The given answer does not provide the correct genotypes for the donor and recipient cells.</reasoning>\n" +
     "<critique>The genotype of the donor cell should be bio+ leu+ arg+ F+ and the genotype of the recipient cell should be bio- leu- arg- F-. The donor cell must have a fertility factor to make a sex pilus, so the genotypes must include the F+ factor.</critique>",
   index: 0,
   logprobs: null,
   finish_reason: "stop",
 }
```
