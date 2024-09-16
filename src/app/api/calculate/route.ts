import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { num1, num2, operation } = body;

  let result: number | string;

  switch (operation) {
    case 'add': result = num1 + num2; break;
    case 'subtract': result = num1 - num2; break;
    case 'multiply': result = num1 * num2; break;
    case 'divide': result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero'; break;
    default: result = 'Invalid operation';
  }

  return NextResponse.json({ result });
}
