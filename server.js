const http = require("http");

const message = 'I am so happy to be part of the Node Girls workshop!'

function handler(request, response) {
    const endpoint = request.url;
    const method = request.method;
    console.log(`${method} ${endpoint}`);

    if (endpoint === "/girls") {
        response.writeHead(200, {"content-type":"text/html"})
        response.write("girls url reached")
        response.end();
    } else if (endpoint === "/node") {
        response.writeHead(200, {"content-type":"text/html"})
        response.write("node url reached")
        response.end();
    }
}

const server = http.createServer(
    handler
);

server.listen(3000, () => console.log("Server is listening on port 3000. Ready to accept requests."))
