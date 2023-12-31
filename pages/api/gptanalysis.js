import OpenAI from 'openai';
import data1 from './learningdata.js'
import data2 from './learningdata.js'
import data3 from './learningdata.js'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export default async function (req, res) {
console.log(req.body);
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body, data1, data2, data3),
    max_tokens: 260,
  });
  console.log(completion.choices[0].text);
  res.status(200).json({ result: completion.choices[0].text });
}


function generatePrompt(danceData, learningdata1, learningdata2, learningdata3) {
    
    return `You are now evaluating how well people are performing dance moves. Analyze how well the person is mimicking set dance moves. You can get the idea how the dance moves go from the examples below. Do not give a text-based evaluation of the situation or of the movement, but only return a percentage of how successful the dance was. The data is from moving a phone on their right hand. The data contains following things: acceleration, accelerationIncludingGravity and rotationRate from devicemotion event, and orientation from deviceorientation event. There are timestamps as well. Based on all this information you know how the phone was moved and with what speed. Do not focus on very short timeperiods but evaluate the bigger movements, so not just comparing every timestamp value. Still, be critical in your evaluation. Getting over 50% should be hard. Do not give 0% easily, but low amounts should be common.

    Data: ${danceData}
    Dance evaluation:`; 
  }