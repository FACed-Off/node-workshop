const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

function createPostHandler(request, response) {
  var allTheData = "";
  request.on("data", function (chunkOfData) {
    allTheData += chunkOfData;
  });

  request.on("end", function () {
    var convertedData = querystring.parse(allTheData);

    fs.readFile(path.join(__dirname, "..", "posts.json"), function (err, file) {
      if (err) {
        throw new Error(err);
      }
      var posts = JSON.parse(file.toString());
      posts[Date.now()] = convertedData.post;
      fs.writeFile(
        path.join(__dirname, "..", "./posts.json"),
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
}
module.exports = createPostHandler;
