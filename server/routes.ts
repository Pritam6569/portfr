import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Test endpoint that returns plain text for network debugging
  app.get('/api/ping', (req, res) => {
    res.send('pong');
  });

  // Test endpoint that returns JSON for API testing
  app.get('/api/info', (req, res) => {
    res.json({
      name: "Pritam's Portfolio API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  });

  // Test endpoint that returns HTML to verify browser display
  app.get('/api/test-html', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h1 { color: #5865F2; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>The server is working correctly!</h1>
            <p>If you can see this page, then the Express server is responding properly.</p>
            <p>The main application should be available at <a href="/">/</a></p>
          </div>
        </body>
      </html>
    `);
  });

  // Return environment info
  app.get('/api/env', (req, res) => {
    res.json({
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
      host: req.get('host'),
      userAgent: req.get('user-agent')
    });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
