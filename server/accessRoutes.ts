import type { Express, Request, Response } from "express";
import { log } from "./vite";

// A dedicated module to add reliable application access routes
export function setupAccessRoutes(app: Express): void {
  // Add a direct route for the root path with a simple HTML response
  // This helps bypass Vite in case of issues
  app.get('/direct', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pritam - Portfolio Direct Access</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              background: #0A1929;
              color: #E2E8F0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .container {
              max-width: 800px;
              background: rgba(10, 25, 41, 0.6);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.05);
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            h1 {
              color: #4DA8FF;
              margin-top: 0;
              font-size: 2.5rem;
            }
            .gradient-text {
              background: linear-gradient(120deg, #4DA8FF, #64FFDA);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            p {
              font-size: 1.2rem;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #4DA8FF 0%, #0B62CC 100%);
              color: white;
              text-decoration: none;
              padding: 12px 25px;
              border-radius: 8px;
              font-weight: 600;
              margin: 10px;
              transition: all 0.3s ease;
            }
            .btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(77, 168, 255, 0.4);
            }
            .links {
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to <span class="gradient-text">Pritam's Portfolio</span></h1>
            <p>This is a direct access page that bypasses the Vite development server.</p>
            <p>If you're seeing this page, it means the Express server is working properly.</p>
            
            <div class="links">
              <p>Application access points:</p>
              <a href="/" class="btn">Main Application</a>
              <a href="/api/health" class="btn">API Health Check</a>
              <a href="/api/test-html" class="btn">Test HTML Page</a>
            </div>
          </div>
        </body>
      </html>
    `);
    log("Direct access route served successfully");
  });

  // Add a route that tests Vite's functioning
  app.get('/vite-test', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vite Integration Test</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h1 { color: #4DA8FF; }
            .success { color: green; }
            .error { color: red; }
          </style>
          
          <!-- Test Vite's script handling -->
          <script type="module">
            window.onload = function() {
              const resultElement = document.getElementById('vite-test-result');
              try {
                // Check if we're in a Vite environment
                if (typeof import.meta !== 'undefined') {
                  resultElement.innerHTML = '<span class="success">Vite environment detected successfully!</span>';
                  resultElement.classList.add('success');
                } else {
                  resultElement.innerHTML = '<span class="error">Not in a Vite environment</span>';
                  resultElement.classList.add('error');
                }
              } catch (error) {
                resultElement.innerHTML = '<span class="error">Error: ' + error.message + '</span>';
                resultElement.classList.add('error');
              }
            };
          </script>
        </head>
        <body>
          <div class="container">
            <h1>Vite Integration Test</h1>
            <p>This page tests if Vite is correctly processing scripts.</p>
            <p>Result: <span id="vite-test-result">Testing...</span></p>
            <div>
              <p><a href="/">Back to main application</a></p>
              <p><a href="/direct">Go to direct access page</a></p>
            </div>
          </div>
        </body>
      </html>
    `);
    log("Vite test route served");
  });

  // Create a special debug page that shows environment info
  app.get('/debug', (req: Request, res: Response) => {
    const envInfo = {
      nodeEnv: process.env.NODE_ENV || 'not set',
      appEnv: app.get('env') || 'not set',
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      protocol: req.protocol,
      secure: req.secure,
      originalUrl: req.originalUrl,
      path: req.path,
      serverTime: new Date().toISOString(),
    };

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Debug</title>
          <style>
            body { font-family: monospace; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            h1 { color: #4DA8FF; }
            .data { background: #111; padding: 15px; border-radius: 5px; overflow-x: auto; }
            .key { color: #64FFDA; }
            .value { color: #FF7E67; }
            a { color: #4DA8FF; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .routes { margin-top: 20px; }
            .route { background: #111; padding: 10px; margin: 5px 0; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Application Debug Information</h1>
            
            <h2>Environment</h2>
            <div class="data">
              <pre>${Object.entries(envInfo).map(([key, value]) => 
                `<span class="key">${key}</span>: <span class="value">${value}</span>`
              ).join('\n')}</pre>
            </div>
            
            <h2>Available Routes</h2>
            <div class="routes">
              <div class="route"><a href="/">/</a> - Main Application</div>
              <div class="route"><a href="/direct">/direct</a> - Direct Access Page</div>
              <div class="route"><a href="/vite-test">/vite-test</a> - Vite Integration Test</div>
              <div class="route"><a href="/api/health">/api/health</a> - API Health Check</div>
              <div class="route"><a href="/api/ping">/api/ping</a> - API Ping Test</div>
              <div class="route"><a href="/api/info">/api/info</a> - API Info</div>
              <div class="route"><a href="/api/env">/api/env</a> - Environment Info</div>
              <div class="route"><a href="/api/test-html">/api/test-html</a> - Test HTML Page</div>
            </div>
          </div>
        </body>
      </html>
    `);
    log("Debug page served with environment info");
  });
}