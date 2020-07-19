const http = require("http");
const fs = require("fs");
const path = require("path");

const extContentType = new Map([
    [".html", "text/html"],
    [".css", "text/css"],
    [".js", "text/javascript"],
    [".png", "image/png"],
]);

const directory = "game";

const server = http.createServer((req, res) => {
    const { url } = req;
    const ext = path.extname(url);
    const contentType = extContentType.get(ext);
    contentType && res.setHeader("Content-Type", contentType);
    const filePath = path.join(directory, url);
    const stream = fs.createReadStream(filePath);
    stream.on("error", (err) => {
        res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("Not found");
    });
    stream.pipe(res);
});

const hostname = "localhost";
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/index.html`);
});
