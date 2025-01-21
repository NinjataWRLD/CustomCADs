import { createServer } from 'https';
import { parse, fileURLToPath } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';
import detect from 'detect-port';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certDir = path.join(__dirname, 'certificates');
const httpsOptions = {
    key: fs.readFileSync(path.join(certDir, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(certDir, 'localhost.pem')),
};

const DEFAULT_PORT = process.env.PORT || 3000;

app.prepare().then(async () => {
    const port = await detect(DEFAULT_PORT);
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://localhost:${port}`);
    });
});
