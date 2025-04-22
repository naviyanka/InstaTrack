const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Set memory limit
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=2048';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ 
  dev,
  conf: {
    // Optimize for memory usage
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
        // Reduce memory usage during build
        config.optimization.minimize = true;
        config.optimization.usedExports = true;
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