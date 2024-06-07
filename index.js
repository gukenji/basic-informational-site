const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "src",
    req.url === "/" ? "index.html" : req.url
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "src", "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end(`Server error ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
    }
  });
});

server.listen(8080);
