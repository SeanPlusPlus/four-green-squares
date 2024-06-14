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

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export async function GET() {
  const currentYear = dayjs().year()
  const lowerBound = currentYear - 100
  const randomYearUpperBound = _random(lowerBound, currentYear)
  const randomYearLowerBound = randomYearUpperBound - 40 
  const randomYears = _times(4, () => _random(randomYearLowerBound, randomYearUpperBound));

  // prompts
  const prompts = randomYears.map((year) => ({
    prompt: `Tell me about an historical event that occurred in the year ${year}. Do not mention the year. The response should be one sentence long.`
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