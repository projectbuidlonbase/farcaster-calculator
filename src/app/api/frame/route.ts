import { NextRequest, NextResponse } from 'next/server';
import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL } from '../../config';

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('POST /api/frame called');
  
  // Remove the body variable since it's not used
  try {
    await req.json(); // You can keep this if you want to validate the request body
  } catch (error) {
    return new NextResponse('Invalid request', { status: 400 });
  }

  // Default response (initial state and "Calculate Again" state)
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Add',
          action: 'post',
        },
        {
          label: 'Subtract',
          action: 'post',
        },
        {
          label: 'Multiply',
          action: 'post',
        },
        {
          label: 'Divide',
          action: 'post',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/calculator-operations.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/calculate`,
    })
  );
}

export const dynamic = 'force-dynamic';