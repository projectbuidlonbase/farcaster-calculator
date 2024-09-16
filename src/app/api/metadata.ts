import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    schema: "1.0",
    fc: { frame: "vNext" },
    title: "Farcaster Calculator",
    description: "Perform basic operations: +, -, *, /",
  });
}
