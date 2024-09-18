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
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <div className="col-span-4 flex justify-center">
      <h1>Farcaster Calculator</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <div className="row">
<label>Enter First Number</label>
<input type="number" onChange={e => setNum1(Number(e.target.value))} />
</div>
<div className="row">
<label>Enter Second Number Number</label>
<input type="number" onChange={e => setNum2(Number(e.target.value))} />
</div>
<div className="row">
<label>Select Operation</label>
<select onChange={e => setOperation(e.target.value as 'add' | 'subtract' | 'multiply' | 'divide')}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
</div>
      <button onClick={calculate}>Calculate</button>
      {result !== null && <div>Result: {result}</div>}
    </form>  
    </div>
    </div>
    </div>
  );
}
