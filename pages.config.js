module.exports = {
  // Configuration for Cloudflare Pages
  build: {
    command: "npm run build",
    directory: "dist",
    includeFiles: ["client/public/**/*"]
  },
  // Optional: Configure custom headers, redirects, etc.
  headers: {
    "/*": {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  }
}
