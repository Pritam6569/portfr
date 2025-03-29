import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { log } from "./vite";
import os from "os";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
    log("Health check endpoint called");
  });

  // Test endpoint that returns plain text for network debugging
  app.get('/api/ping', (req: Request, res: Response) => {
    res.send('pong');
    log("Ping endpoint called");
  });

  // Test endpoint that returns JSON for API testing
  app.get('/api/info', (req: Request, res: Response) => {
    res.json({
      name: "Pritam's Portfolio API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      system: {
        platform: process.platform,
        nodejs: process.version,
        memory: {
          total: Math.round(os.totalmem() / (1024 * 1024)) + 'MB',
          free: Math.round(os.freemem() / (1024 * 1024)) + 'MB'
        },
        cpus: os.cpus().length
      }
    });
    log("Info endpoint called with extended system information");
  });

  // Advanced debug endpoint for diagnosing Vite issues
  app.get('/api/debug', (req: Request, res: Response) => {
    const clientDir = path.resolve(__dirname, "..", "client");
    const indexPath = path.join(clientDir, "index.html");
    
    // Check if critical files exist
    const fileChecks = {
      clientDir: {
        path: clientDir,
        exists: false,
        isDirectory: false
      },
      indexHtml: {
        path: indexPath,
        exists: false,
        isDirectory: false,
        size: null
      },
      mainTsx: {
        path: path.join(clientDir, "src", "main.tsx"),
        exists: false,
        size: null
      }
    };
    
    try {
      // Client directory check
      try {
        const clientDirStat = fs.statSync(clientDir);
        fileChecks.clientDir.exists = true;
        fileChecks.clientDir.isDirectory = clientDirStat.isDirectory();
      } catch (err) {
        // Client directory doesn't exist
      }
      
      // index.html check
      try {
        const indexStat = fs.statSync(indexPath);
        fileChecks.indexHtml.exists = true;
        fileChecks.indexHtml.isDirectory = indexStat.isDirectory();
        fileChecks.indexHtml.size = indexStat.size;
      } catch (err) {
        // index.html doesn't exist
      }
      
      // main.tsx check
      try {
        const mainTsxStat = fs.statSync(path.join(clientDir, "src", "main.tsx"));
        fileChecks.mainTsx.exists = true;
        fileChecks.mainTsx.size = mainTsxStat.size;
      } catch (err) {
        // main.tsx doesn't exist
      }
      
      res.json({
        server: {
          nodeEnv: process.env.NODE_ENV,
          uptime: process.uptime() + " seconds",
          memoryUsage: process.memoryUsage(),
          cwd: process.cwd(),
          execPath: process.execPath
        },
        request: {
          url: req.url,
          method: req.method,
          headers: req.headers,
          ip: req.ip,
          hostname: req.hostname
        },
        fileSystem: fileChecks,
        accessRoutes: {
          direct: "/direct",
          debug: "/debug",
          viteTest: "/vite-test",
          apiTestHtml: "/api/test-html"
        }
      });
      
      log("Debug endpoint called with detailed diagnostics");
    } catch (error) {
      res.status(500).json({
        error: "Error generating debug information",
        message: (error as Error).message
      });
      log("Error in debug endpoint: " + (error as Error).message);
    }
  });

  // Test endpoint that returns HTML to verify browser display
  app.get('/api/test-html', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 40px; line-height: 1.6; color: #333; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; padding: 30px; border-radius: 10px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); background: white; }
            h1 { color: #4DA8FF; margin-bottom: 20px; }
            a { color: #4DA8FF; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .btn { display: inline-block; background: #4DA8FF; color: white; padding: 8px 16px; border-radius: 4px; margin-top: 15px; }
            .btn:hover { background: #3a8ceb; text-decoration: none; }
            .links { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>The server is working correctly!</h1>
            <p>If you can see this page, then the Express server is responding properly.</p>
            <p>Available access points:</p>
            
            <div class="links">
              <a href="/" class="btn">Main Application</a>
              <a href="/direct" class="btn">Direct Access</a>
              <a href="/debug" class="btn">Debug Information</a>
              <a href="/api/health" class="btn">API Health</a>
              <a href="/api/info" class="btn">API Info</a>
            </div>
          </div>
        </body>
      </html>
    `);
    log("Test HTML endpoint called");
  });

  // Return environment info
  app.get('/api/env', (req: Request, res: Response) => {
    res.json({
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
      host: req.get('host'),
      userAgent: req.get('user-agent'),
      headers: req.headers
    });
    log("Environment info endpoint called");
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
