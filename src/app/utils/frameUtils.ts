export function getFrameHtmlResponse(result: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://https://farcaster-calculator.vercel.app/calculator.png" />
          <meta property="fc:frame:button:1" content="+" />
          <meta property="fc:frame:button:2" content="-" />
          <meta property="fc:frame:button:3" content="*" />
          <meta property="fc:frame:button:4" content="/" />
          <meta property="fc:frame:input:text" content="Enter two numbers separated by a comma (e.g., 10,5)" />
        </head>
        <body>
          <h1>Farcaster Calculator</h1>
          <p>Result: ${result}</p>
          <p>Enter two numbers separated by a comma, then choose an operation.</p>
        </body>
      </html>
    `;
  }