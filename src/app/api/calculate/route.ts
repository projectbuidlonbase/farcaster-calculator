import { NextRequest, NextResponse } from 'next/server';
import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL } from '../../config';

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new NextResponse('Invalid request', { status: 400 });
  }

  console.log('Request body:', body);

  const { untrustedData } = body;
  const { buttonIndex, inputText } = untrustedData;

  console.log('Button Index:', buttonIndex);
  console.log('Input Text:', inputText);

  let operation = '';
  switch (buttonIndex) {
    case 1:
      operation = '+';
      break;
    case 2:
      operation = '-';
      break;
    case 3:
      operation = '*';
      break;
    case 4:
      operation = '/';
      break;
    default:
      return new NextResponse('Invalid operation', { status: 400 });
  }

  if (!inputText) {
    // User has selected an operation but hasn't entered numbers yet
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Submit',
            action: 'post',
          },
        ],
        image: `${NEXT_PUBLIC_URL}/input.png`,
        post_url: `${NEXT_PUBLIC_URL}/api/calculate`,
        input: {
          text: `Enter two numbers separated by a comma for ${operation} (e.g., 10,5)`,
        },
      })
    );
  }

  // If we have both operation and inputText, perform the calculation
  const [num1, num2] = inputText.split(',').map(Number);
  if (!isNaN(num1) && !isNaN(num2)) {
    let result = '';
    switch (operation) {
      case '+':
        result = `${num1 + num2}`;
        break;
      case '-':
        result = `${num1 - num2}`;
        break;
      case '*':
        result = `${num1 * num2}`;
        break;
      case '/':
        result = num2 !== 0 ? `${num1 / num2}` : 'Error: Division by zero';
        break;
    }
    const html = getFrameHtmlResponse({
      buttons: [
        {
          label: 'Calculate Again',
          action: 'post',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/og?result=${encodeURIComponent(result)}`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    });
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } else {
    return new NextResponse('Invalid input', { status: 400 });
  }
}

export const dynamic = 'force-dynamic';