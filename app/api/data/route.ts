import { NextResponse } from "next/server"
import _get from 'lodash/get'
import OpenAIApi from 'openai'

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
  // Prompt
  const prompt = 'Tell me a random fact about the cosmos'

  // Completion
  const model = 'gpt-3.5-turbo'
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model
  })

  // Output
  const output = _get(chatCompletion, 'choices[0].message.content')

  const events = [
    {
      year: 1983,
      text: "The Nintendo Entertainment System (NES) was released in Japan.",
    },
    {
      year: 1981,
      text: "The first launch of the Space Shuttle program occurred with the successful mission of Columbia.",
    },
    {
      year: 1975,
      text: "The Vietnam War officially ended with the Fall of Saigon on April 30, marking the capture of the South Vietnamese capital by the People's Army of Vietnam and the Viet Cong.",
    },
    {
      year: 1966,
      text: "The first artificial heart was successfully implanted in a human.",
    },
  ]

  return NextResponse.json({
    events: shuffleArray(events),
    output,
  })
}