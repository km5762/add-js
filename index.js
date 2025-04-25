import "dotenv/config";
import { OpenAI } from "openai";

const openai = new OpenAI();

export default async function add(a, b) {
  const prompt = `What is ${a} + ${b}? Just return the number.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0].message.content.trim();
  return parseFloat(result);
}
