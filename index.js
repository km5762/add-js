import "dotenv/config";
import { OpenAI } from "openai";

const openai = new OpenAI();
const RETRY_LIMIT = 10

function parseBoolean(value) {
  return value === 'true';
}

async function isNumeric(a, b) {
  //sometimes this is wrong
  const response = await openai.responses.create({
    model: 'gpt-3.5-turbo',
    instructions: 'You are an arithmetic nerd who always answers in one word describing the situation.',
    input: `Are ${a} and ${b} BOTH numeric? Respond with \'true\' or \'false\' ONLY.`,
    temperature: 0
  });
  return parseBoolean(response.output_text);
}

export default async function add(a, b) {
  let attempts = 0;
  let sum = null;
  while (attempts < RETRY_LIMIT) {
    const isNumericResult = await isNumeric(a, b);

    if (!isNumericResult) {
      throw new Error(`${a} or ${b} is not numeric!`);
    }
    const prompt = `What is ${a} + ${b}? Just return the number.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0
    });

    const result = completion.choices[completion.choices.length - 1].message.content.trim();
    let local_sum = parseFloat(result); // check is numeric
    if (!Number.isNaN(local_sum)) {
      sum = local_sum;
      break;
    }
  }
  if (sum === null) {
    throw new Error(`Could not compute the sum of ${a} and ${b}. We apologize!`);
  } else {
    return sum;
  }
}
