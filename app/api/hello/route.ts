import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json({
    messsage: "Hello World! Stoked!",
    random: (Math.floor(Math.random() * (100+ 1))), 
  })
}