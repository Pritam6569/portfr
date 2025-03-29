import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupAccessRoutes } from "./accessRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    // Log all routes, not just API routes for debugging
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
  });

  next();
});

(async () => {
  try {
    // Explicitly set environment to development to ensure correct Vite setup
    process.env.NODE_ENV = "development";
    app.set("env", "development");
    
    // Setup our API routes first
    const server = await registerRoutes(app);
    
    // Then add our special access routes before Vite
    // This ensures these routes are available even if Vite has issues
    setupAccessRoutes(app);
    
    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`, "error");
      console.error("Server Error:", err);
      res.status(status).json({ message, status });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      log("Setting up Vite in development mode");
      await setupVite(app, server);
    } else {
      log("Setting up static serving in production mode");
      serveStatic(app);
    }

    // Fallback route in case Vite's catch-all fails
    app.use("*", (req, res) => {
      log(`Fallback route handling: ${req.originalUrl}`);
      res.redirect("/direct");
    });

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`Server is running on port ${port}`);
      log(`Access the application at: http://localhost:${port}`);
      log(`Direct access URL: http://localhost:${port}/direct`);
      log(`Debug information: http://localhost:${port}/debug`);
      log(`API endpoints available at: http://localhost:${port}/api/`);
    });
  } catch (error) {
    log(`Server startup error: ${(error as Error).message}`, "startup-error");
    console.error("Fatal server error:", error);
    process.exit(1);
  }
})();
