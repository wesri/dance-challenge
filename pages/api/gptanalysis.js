import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.idea),
    temperature: 0.8,
    max_tokens: 260
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(danceData) {
    return `You are now evaluating how well people are dancing. Analyze how well the person is moving their hand up and down. The following data is from accelerometer from a phone.
  
  Data: ${danceData}
  Dance evaluation:`; 
  }