import server from '../dist/server/server.js';

function getRequestUrl(req) {
  const host = req.headers.host ?? 'localhost';
  return new URL(req.url ?? '/', `http://${host}`).toString();
}

function getRequestHeaders(req) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (!value) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.append(key, value);
    }
  }
  return headers;
}

export default async function handler(req, res) {
  const requestInit = {
    method: req.method,
    headers: getRequestHeaders(req),
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    requestInit.body = req;
    requestInit.duplex = 'half';
  }

  const request = new Request(getRequestUrl(req), requestInit);

  const response = await server.fetch(request, undefined, undefined);

  const headers = {};
  response.headers.forEach((value, key) => {
    const existing = headers[key.toLowerCase()];
    if (existing === undefined) {
      headers[key.toLowerCase()] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      headers[key.toLowerCase()] = [existing, value];
    }
  });

  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  res.statusCode = response.status;
  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
