const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const requestedPath = req.url === '/' ? '/index.html' : req.url;

    const filePath = path.join(__dirname, requestedPath);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
            return;
        }

        let contentType = 'text/html';

        if (filePath.endsWith('.css')) {
            contentType = 'text/css';
        } else if (filePath.endsWith('.js')) {
            contentType = 'text/javascript';
        }

        res.writeHead(200, {
            'Content-Type': contentType
        });

        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`ShopSphere is running at http://localhost:${PORT}`);
});