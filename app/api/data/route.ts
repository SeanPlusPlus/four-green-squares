import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const events = [
    {
      year: 1966,
      text: "The first artificial heart was successfully implanted in a human. This groundbreaking medical achievement marked a significant advancement in cardiac surgery.",
    },
    {
      year: 1975,
      text: "The Vietnam War officially ended with the Fall of Saigon on April 30, marking the capture of the South Vietnamese capital by the People's Army of Vietnam and the Viet Cong. This event led to the unconditional surrender of South Vietnam and the reunification of Vietnam under communist control.",
    },
    {
      year: 1981,
      text: "The first launch of the Space Shuttle program occurred with the successful mission of Columbia. This marked a new era in reusable spacecraft for NASA.",
    },
    {
      year: 1983,
      text: "The Nintendo Entertainment System (NES) was released in Japan. It revolutionized the video game industry and became a global phenomenon.",
    },
  ]

  return NextResponse.json({
    events,
  })
}