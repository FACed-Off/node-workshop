const fs = require("fs");

function homeHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  fs.readFile(__dirname + "/../../public/index.html", function (error, file) {
    /* istanbul ignore else */
    if (error) {
      response.writeHead(500, {
        "content-type": "text/html",
      });
      response.end("<h1>Server Error</h1>");
    }
    response.end(file);
  });
}
module.exports = homeHandler;
