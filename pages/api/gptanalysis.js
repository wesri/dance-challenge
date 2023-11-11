

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
    
    return `You are now evaluating how well people performing dance moves. Analyze how well the person is moving their hand up and down. Do not give a text-based evaluation of the situation or of the movement, but only return a percentage of how successful the dance was. The following data is from moving a phone. The data contains following things: acceleration, accelerationIncludingGravity and rotationRate from devicemotion event, and orientation from deviceorientation event. There are timestamps as well. Based on all this information you should know how the phone was moved and with what speed.

  Data: ${danceData}
  Dance evaluation:`; 
  }