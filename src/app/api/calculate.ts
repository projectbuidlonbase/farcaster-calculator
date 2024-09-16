import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { num1, num2, operation }: { num1: number; num2: number; operation: 'add' | 'subtract' | 'multiply' | 'divide' } = req.body;
  
  let result: number | string;
  
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
      break;
    default:
      result = 'Invalid operation';
  }
  
  res.status(200).json({ result });
}
