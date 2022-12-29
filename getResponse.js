// TEST OBJECT
// const obj = {
//   text:
//     "\n" +
//     "\n" +
//     "<rating>0.67</rating>\n" +
//     "<reasoning>The given answer does not provide the correct genotypes for the donor and recipient cells.</reasoning>\n" +
//     "<critique>The genotype of the donor cell should be bio+ leu+ arg+ F+ and the genotype of the recipient cell should be bio- leu- arg- F-. The donor cell must have a fertility factor to make a sex pilus, so the genotypes must include the F+ factor.</critique>",
//   index: 0,
//   logprobs: null,
//   finish_reason: "stop",
// };

const extractIndicies = (str, offset, obj) => {
  const indicies = {};
  indicies.i = obj.text.indexOf(`<${str}>`) + offset;
  indicies.j = obj.text.indexOf(`</${str}>`);
  return indicies;
};

const getFloatFromObj = (obj) => {
  const { i, j } = extractIndicies("rating", 8, obj);

  const rating = obj.text.substring(i, j);
  return rating;
};

const getReasoning = (obj) => {
  const { i, j } = extractIndicies("reasoning", 11, obj);

  const reasoning = obj.text.substring(i, j);
  return reasoning;
};
const getCritique = (obj) => {
  const { i, j } = extractIndicies("critique", 10, obj);

  const critique = obj.text.substring(i, j);
  return critique;
};

// THIS IS THE EXPORTED FN

const extractResponse = (obj) => {
  const response = {}; // Init return object

  response.rating = parseFloat(getFloatFromObj(obj)); // calls getFloat to return rating string, then convert into floating point number
  response.reasoning = getReasoning(obj); // calls getReasoning to return reason in paragraph
  response.critique = getCritique(obj); // calls getCritique to return crit in paragraph
  return response; // returns everything in object to be used elsewhere in application
};

exports.extractResponse = extractResponse;

// NOTE example responses
// {
//   rating: 0.4,
//   reasoning: 'The response does not accurately describe the genotypes of the donor and recipient cells.',
//   critique: 'The donor cell should have a genotype of bio+ leu+ arg+ F+, and the recipient cell should have a genotype of bio- leu- arg- F-. Additionally, the response should clarify which is the donor cell and which is the recipient cell. '
// }
// {
//   rating: 0,
//   reasoning: 'The given answer does not provide the correct genotypes for the donor and recipient cells.',
//   critique: 'The genotype of the donor cell should be bio+ leu+ arg+ F+ and the genotype of the recipient cell should be bio- leu- arg- F-. The donor cell must have a fertility factor to make a sex pilus, so the genotypes must include the F+ factor.'
// }
