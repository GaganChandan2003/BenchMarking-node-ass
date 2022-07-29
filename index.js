const http = require("http");
const fs = require("fs");
const promises = fs.promises;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");

  if (req.url === "/") {
    res.end(".../");
  } else if (req.url === "/textsync") {
    let data = fs.readFileSync("./text.txt", { encoding: "utf-8" });
    res.end("yes");
  } else if (req.url === "/textasync") {
    fs.readFile("./text.txt", { encoding: "utf-8" }, (err, data) => {
      res.end(data);
    });
  } else if (req.url === "/stream") {
    const dataStream = fs.createReadStream("./text.txt", "utf-8");
    dataStream.pipe(res);
  } else if (req.url === "/textpromise") {
    promises
      .readFile("./text.txt", { encoding: "utf-8" })
      .then((r) => res.end(r))
      .catch((e) => res.end("Someting went wrong"));
  }
});

server.listen(8080);
