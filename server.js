const http = require("http");
//const handler = require("./src/handlers");
const router = require("./router");

const server = http.createServer(router);

server.listen(3000, () =>
  console.log("Server is listening on port 3000. Ready to accept requests.")
);
