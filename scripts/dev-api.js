import http from 'http';
import callbackHandler from '../api/donations/callback.js';
import createHandler from '../api/donations/create.js';
import donorsHandler from '../api/donations/donors.js';
import getHandler from '../api/donations/get.js';
import mpesaHandler from '../api/donations/mpesa.js';

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 9999;

function getHandlerForPath(pathname) {
  const handlers = {
    '/api/donations/callback': callbackHandler,
    '/api/donations/create': createHandler,
    '/api/donations/donors': donorsHandler,
    '/api/donations/get': getHandler,
    '/api/donations/mpesa': mpesaHandler,
  };
  return handlers[pathname];
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const donationHandler = getHandlerForPath(url.pathname);
    if (!donationHandler) return sendJson(res, 404, { message: 'API route not found' });

    req.query = Object.fromEntries(url.searchParams.entries());
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const rawBody = Buffer.concat(chunks).toString('utf8');
      try {
        req.body = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        return sendJson(res, 400, { message: 'Request body must be valid JSON' });
      }
    }

    res.status = (status) => { res.statusCode = status; return res; };
    res.json = (body) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
      return res;
    };
    await donationHandler(req, res);
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
