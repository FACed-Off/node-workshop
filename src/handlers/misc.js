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
  console.log(endpoint);
  const endpointArray = endpoint.split(".");
  const extension = endpointArray[1];
  const type = types[extension];
  console.log(type);
  fs.readFile(path.join(__dirname, "..", "..", "public", endpoint), function (
    error,
    file
  ) {
    if (error) {
      throw new Error(error);
    } else {
      response.writeHead(200, { "Content-Type": type });
      response.end(file);
    }
  });
}
module.exports = miscHandler;
