const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/anomaly.li/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/anomaly.li/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/anomaly.li/chain.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://anomaly.li.com");
  });
});
