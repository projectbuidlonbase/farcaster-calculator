import { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

// Define the metadata for the page
export const metadata: Metadata = {
  title: 'Farcaster Calculator Frame',
  description: 'A simple calculator frame for Farcaster',
  openGraph: {
    title: 'Farcaster Calculator Frame',
    description: 'A simple calculator frame for Farcaster',
    images: [`${NEXT_PUBLIC_URL}/calculator.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${NEXT_PUBLIC_URL}/calculator.png`,
    'fc:frame:button:1': 'Calculate',
    'fc:frame:post_url': `${NEXT_PUBLIC_URL}/api/frame`,
  },
};

export default function Page() {
  return (
    <div>
      <h1>Farcaster Calculator Frame</h1>
      <p>This is a Farcaster frame for a simple calculator.</p>
    </div>
  );
}