import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Farcaster Calculator Action</h1>
      <p className="mb-4">
        Welcome to the Farcaster Calculator Action! This action allows you to perform basic arithmetic operations right within your Farcaster client.
      </p>
      <h2 className="text-2xl font-semibold mb-2">How to Use</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Add this action to your Farcaster client</li>
        <li>When prompted, enter two numbers separated by a comma (e.g., &quot;10,5&quot;)</li>
        <li>Choose an operation: + (add), - (subtract), * (multiply), or / (divide)</li>
        <li>View the result in your Farcaster client</li>
      </ol>
      <p className="mb-4">
        That&apos;s it! Enjoy quick calculations without leaving your Farcaster feed.
      </p>
      <p className="text-sm text-gray-600">
        Note: This action is designed to work within Farcaster clients and doesn&apos;t provide 
        interactive features on this webpage.
      </p>
    </div>
  );
}