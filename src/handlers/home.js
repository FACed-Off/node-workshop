const fs = require("fs");

function homeHandler(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  fs.readFile(__dirname + "/../../public/index.html", function (error, file) {
    if (error) {
      return;
    }
    response.end(file);
  });
}
module.exports = homeHandler;
