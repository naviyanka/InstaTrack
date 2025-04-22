const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Set memory limit
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=4096';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// Check if .next directory exists
const nextDir = path.join(__dirname, 'app', '.next');
if (!fs.existsSync(nextDir)) {
  console.error('Error: .next directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const app = next({ 
  dev,
  dir: path.join(__dirname, 'app'),
  conf: {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          'react-vendor': {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
          },
        };
      }
      return config;
    },
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}); 