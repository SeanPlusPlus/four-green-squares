import { NextResponse } from "next/server"
import _get from 'lodash/get'
import _random from 'lodash/random'
import _times from 'lodash/times'
import OpenAIApi from 'openai'
import dayjs from 'dayjs'

require('dotenv').config()

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const lowerBound = 1900
  const currentYear = dayjs().year()
  const randomYears = _times(3, () => _random(lowerBound, currentYear));

  // prompts
  const prompts = randomYears.map((year) => ({
    prompt: `Tell me about an historical event that occurred in the year ${year}. The event can be literary, scientific, artistic, athletic, political, the year someone famous was born or died or did something interesting. However, do not mention the year at all. Do not mention any year at all in your response. This response is going to be used a in a history trivia game so make sure it is interesting! The response should be one or two sentences long.`
  }));
  
  // completions
  const model = 'gpt-3.5-turbo'
  const chatCompletions = await Promise.all(
    prompts.map(async ({ prompt }) => {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model
      });
  
      return completion;
    })
  );
  
  // outputs
  const events = chatCompletions.map((completion, index) => ({
    year: randomYears[index],
    text: _get(completion, 'choices[0].message.content')
  }));

  return NextResponse.json({
    events,
  })
}