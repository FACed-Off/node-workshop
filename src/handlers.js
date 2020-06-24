const fs = require("fs");
const querystring = require("querystring");

function handler(request, response) {
  const endpoint = request.url;
  const method = request.method;

  if (endpoint === "/") {
    response.writeHead(200, { "content-type": "text/html" });

    fs.readFile(__dirname + "/../public/index.html", function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === "/girls") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("girls url reached");
    response.end();
  } else if (endpoint === "/node") {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("node url reached");
    response.end();
  } else if (endpoint === "/create-post") {
    response.writeHead(302, { location: "/" });
    response.end();
  } else {
    const fileExtension = endpoint.split(".")[1];
    response.writeHead(200, { "content-type": `text/${fileExtension}` });

    fs.readFile(__dirname + `/../public${endpoint}`, function (error, file) {
      console.log(`sending ${endpoint}`);

      let allTheData = "";
      request.on("data", function (chunkOfData) {
        allTheData += chunkOfData;
      });

      request.on("end", function () {
        const convertedData = querystring.parse(allTheData);
        console.log(convertedData);
        response.end();
      });

      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}

module.exports = handler;
