const fs = require("fs");
const path = require("path");

function miscHandler(request, response) {
  const endpoint = request.url;
  const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png",
  };
  const endpointArray = endpoint.split(".");
  const extension = endpointArray[1];
  const type = types[extension];
  fs.readFile(path.join(__dirname, "..", "..", "public", endpoint), function (
    error,
    file
  ) {
    if (error) {
      response.statusCode = 500;
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, { "Content-Type": type });
      response.end(file);
    }
  });
}
module.exports = miscHandler;
