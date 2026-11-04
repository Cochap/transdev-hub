// Serves one local PDF (any path) plus the pdf.js page, on 127.0.0.1 only.
// Usage: node serve.js "C:/path/to/file.pdf" [port]   then open http://127.0.0.1:<port>/?p=1&s=1.3 in the built-in browser.
const http = require('http'), fs = require('fs'), path = require('path');
const pdf = process.argv[2], port = +(process.argv[3] || 4789);
if (!pdf || !fs.existsSync(pdf)) { console.error('Give an existing PDF path'); process.exit(1); }
http.createServer((q, r) => {
  if (q.url.startsWith('/sot.pdf')) { r.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': fs.statSync(pdf).size }); fs.createReadStream(pdf).pipe(r); }
  else { r.writeHead(200, { 'Content-Type': 'text/html' }); fs.createReadStream(path.join(__dirname, 'index.html')).pipe(r); }
}).listen(port, '127.0.0.1', () => console.log('serving', pdf, 'on http://127.0.0.1:' + port));
