const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalize and decode URL path and resolve to local file system
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(req.url);
  } catch (e) {
    decodedUrl = req.url;
  }
  let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);

  // Prevent directory traversal attacks
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  // Read file stats
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Return 404 or index.html for virtual routes if desired.
      // Since it's a client-side SPA, we'll serve index.html for non-file requests
      const ext = path.extname(filePath);
      if (!ext) {
        filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err2, content) => {
          if (err2) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found');
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(content);
          }
        });
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
      }
      return;
    }

    // Read and serve the file
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
