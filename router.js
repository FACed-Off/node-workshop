const homeHandler = require("./src/handlers/home");
const createPostHandler = require("./src/handlers/createPost");
const displayPostHandler = require("./src/handlers/displayPosts");
const miscHandler = require("./src/handlers/misc");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url === "/create/post") {
    createPostHandler(request, response);
  } else if (url === "/posts") {
    displayPostHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;
