

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


export default async function (req, res) {
console.log(req.body);
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.data),
    max_tokens: 260,
  });
  console.log(completion.choices[0].text);
  res.status(200).json({ result: completion.choices[0].text });
}


function generatePrompt(danceData) {
    
    return `You are now evaluating how well people are dancing. Analyze how well the person is moving their hand up and down. The following data is from accelerometer from a phone.
  
  Data: ${danceData}
  Dance evaluation:`; 
  }