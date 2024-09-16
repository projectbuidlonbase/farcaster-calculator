"use client"
import { useState } from 'react';

export default function Home() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<number | null>(null);

  const calculate = async () => {
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ num1, num2, operation }),
    });

    const data: { result: number } = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <h1>Farcaster Calculator</h1>
      <input type="number" onChange={e => setNum1(Number(e.target.value))} />
      <input type="number" onChange={e => setNum2(Number(e.target.value))} />
      <select onChange={e => setOperation(e.target.value as 'add' | 'subtract' | 'multiply' | 'divide')}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result !== null && <div>Result: {result}</div>}
    </div>
  );
}
