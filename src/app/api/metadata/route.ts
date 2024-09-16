import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    schema: "1.0",
    fc: { frame: "vNext" },
    title: "Farcaster Calculator",
    description: "Perform basic operations: +, -, *, /",
  });
}
