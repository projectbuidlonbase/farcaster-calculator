import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const result = searchParams.get('result');

  if (!result) {
    return new NextResponse('Result parameter is required', { status: 400 });
  }

  // Paths for local resources
  const imagePath = path.join(process.cwd(), 'public', 'result-background.png');
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');

  try {
    // Ensure the font file exists
    if (!fs.existsSync(fontPath)) {
      throw new Error(`Font file not found at: ${fontPath}`);
    }

    console.log('Font file exists, proceeding with image generation...');

    // Create an SVG buffer with the result text
    const svgBuffer = Buffer.from(`
      <svg width="600" height="400">
        <style>
          @font-face {
            font-family: 'Arial';
            src: url('data:font/ttf;base64,${fs.readFileSync(fontPath).toString('base64')}') format('truetype');
          }
          .text { font-family: 'Arial'; font-size: 48px; fill: black; }
        </style>
        <text x="50" y="200" class="text">Result: ${decodeURIComponent(result)}</text>
      </svg>
    `);

    // Use sharp to overlay the SVG text on the background image
    const image = await sharp(imagePath)
      .resize(600, 400)
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
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
