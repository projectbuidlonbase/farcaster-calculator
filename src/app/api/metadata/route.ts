import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Farcaster Calculator",
    icon: "calculator",
    description: "Perform basic calculations on Farcaster",
    action: {
      type: "post",
      postUrl: "https://farcaster-calculator.vercel.app/api/calculate" // Replace with your own domain name
    }
  });
}