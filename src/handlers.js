const fs = require("fs");
const querystring = require("querystring");
const path = require("path");

function handler(request, response) {
  const endpoint = request.url;
  const method = request.method;

  if (endpoint === "/") {
    response.writeHead(200, { "content-type": "text/html" });

    fs.readFile(__dirname + "/../public/index.html", function (error, file) {
      if (error) {
        return;
      }
      response.end(file);
    });
  } else if (endpoint === "/create/post") {
    var allTheData = "";
    request.on("data", function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on("end", function () {
      var convertedData = querystring.parse(allTheData);

      fs.readFile(path.join(__dirname, "posts.json"), function (err, file) {
        if (err) {
          throw new Error(err);
        }
        var posts = JSON.parse(file.toString());
        posts[Date.now()] = convertedData.post;
        fs.writeFile(
          path.join(__dirname, "./posts.json"),
          JSON.stringify(posts),
          function (err) {
            if (err) {
              throw new Error(err);
            } else {
              response.writeHead(302, { Location: "/" });
              response.end();
            }
          }
        );
      });
    });
  } else if (endpoint === "/posts") {
    // response.writeHead(200, { "content-type": "application/json" });
    fs.readFile(path.join(__dirname, "posts.json"), "utf8", function (
      err,
      file
    ) {
      if (err) {
        throw new Error(err);
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(file);
    });
  } else {
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
    fs.readFile(path.join(__dirname, "..", "public", endpoint), function (
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
    // const fileExtension = endpoint.split(".")[1];
    // response.writeHead(200, { "content-type": `text/${fileExtension}` });
    // fs.readFile(__dirname + `/../public${endpoint}`, function (error, file) {
    //   let allTheData = "";
    //   request.on("data", function (chunkOfData) {
    //     allTheData += chunkOfData;
    //   });
    //   request.on("end", function () {
    //     const convertedData = querystring.parse(allTheData);
    //   });
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   response.end(file);
    // });
  }
}

module.exports = handler;
