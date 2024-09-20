import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const result = searchParams.get('result');

  if (!result) {
    return new NextResponse('Result parameter is required', { status: 400 });
  }

  const imagePath = path.join(process.cwd(), 'public', 'result-background.png');
  
  try {
    const image = await sharp(imagePath)
      .resize(600, 400)
      .composite([
        {
          input: {
            text: {
              text: `Result: ${decodeURIComponent(result)}`,
              font: 'sans-serif',
              rgba: true,
            },
          },
          top: 175,
          left: 50,
        },
      ])
      .png()
      .toBuffer();

    return new NextResponse(image, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'max-age=10',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
