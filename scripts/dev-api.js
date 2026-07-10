import http from 'http';
import handler from '../api/server.js';

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 9999;

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('API dev server error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Internal API dev server error' }));
  }
});

server.listen(port, () => {
  console.log(`API dev server is listening on http://127.0.0.1:${port}`);
});
