import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ messsage: "Hello World!", random: (Math.floor(Math.random() * (100+ 1))) });
}