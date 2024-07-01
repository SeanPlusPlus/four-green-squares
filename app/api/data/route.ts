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
  const currentYear = dayjs().year()
  const lowerBound = 1900
  const randomYearUpperBound = _random(lowerBound, currentYear)
  const randomYearLowerBound = randomYearUpperBound - 100 
  const randomYears = _times(3, () => _random(randomYearLowerBound, randomYearUpperBound));

  // prompts
  const prompts = randomYears.map((year) => ({
    prompt: `Tell me about an historical event that occurred in the year ${year}. Do not mention the year at all. Do not mention any year. This response is going to be used a in a history trivia game so make sure it is interesting! The response should be one or two sentences long.`
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