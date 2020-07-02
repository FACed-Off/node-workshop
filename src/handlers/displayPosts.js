const fs = require("fs");
const path = require("path");

function displayPostHandler(request, response) {
  fs.readFile(path.join(__dirname, "..", "posts.json"), "utf8", function (
    err,
    file
  ) {
    if (err) {
      throw new Error(err);
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(file);
  });
}
module.exports = displayPostHandler;
