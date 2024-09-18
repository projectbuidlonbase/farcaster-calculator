import { NextRequest, NextResponse } from 'next/server';
import { getFrameHtmlResponse } from '@/app/utils/frameUtils';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: Implement proper signature validation
  // For now, we'll assume the request is valid

  const { buttonIndex, inputText } = body;

  let result = '';
  let operation = '';

  if (buttonIndex === 1) operation = '+';
  else if (buttonIndex === 2) operation = '-';
  else if (buttonIndex === 3) operation = '*';
  else if (buttonIndex === 4) operation = '/';

  if (operation && inputText) {
    const [num1, num2] = inputText.split(',').map(Number);
    if (!isNaN(num1) && !isNaN(num2)) {
      switch (operation) {
        case '+': result = `${num1 + num2}`; break;
        case '-': result = `${num1 - num2}`; break;
        case '*': result = `${num1 * num2}`; break;
        case '/': result = num2 !== 0 ? `${num1 / num2}` : 'Error: Division by zero'; break;
      }
    } else {
      result = 'Error: Invalid input';
    }
  }

  const html = getFrameHtmlResponse(result);

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}