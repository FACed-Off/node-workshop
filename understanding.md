# Step 11 - Understanding the solution

## What happens when we run `node server.js` with our server.js file in our pwd?

* `node server.js` will run our server file
* which creates our server `const server = http.createServer(handler);`
* and sets it up to listen at `http://localhost:3000/` using our `server.listen` method
* Every time we send a request to the server it will be handled by our handler file which is required in server.js: `const handler = require("./src/handlers");`

## Initial request to "/"

* This is handled by our `endpoint === "/"` block:

* We give our response body a html header, and a status code of 200 representing an OK response. 
```
response.writeHead(200, { "content-type": "text/html" });
```
* We then use our filesystem (fs) read method to read in our `index.html` file, eventually serving it to our `http://localhost:3000/` url as the response body (which is displayed),
assuming there is no error with reading the file

## Reading `index.html` using the `fs` module

> Is there any documentation available on how exactly the fs.readFile() method scans HTML documents? The following is my current understanding, however it would be useful to see documentation
to confirm my understanding is correct.

* When the readfile method is called on a HTML file, any source tags will be interpreted as requests to be made to `server.js`.
* A total of 5 requests are made when `index.html` is requested from the file itself, or from files linked to `index.html`. These are `GET` requests to `/main.css`,
`/script.js`,`img/logo1.png`,`/posts` and `img/logo2.png`

> Why is there not a request made to the google font API?

* The reason why requests are made to `/main.css`, `/script.js` and `img/logo1.png` are intuitive, as they are directly linked in the `index.html` file.
* The request to `/posts` is made as a result of the `xhr.open("GET", "/posts", true);` in our `/script.js` request, this is a direct request in the same way a fetch would
request from an API. Details on the XMLHttp request can be found [here](https://javascript.info/xmlhttprequest)
* The request to `/img/logo2.png` is also found within our `/script.js` request

## What does our `script.js` file do to our `index.html`?

* This script runs when the page has loaded `if (document.readyState === "complete")` and uses the response from its' GET request to `/posts` to populate the `index.html`
* The `GET` request to `/posts` retrieves the `posts.json` file that exists on our system, adds a JSON header to it, but still has to serve it in string format as we cannot send objects as responses.
* We then convert our JSON string to a JSON object to be worked with `var data = JSON.parse(xhr.responseText);`
* We then use object property iteration to create a div in the DOM for each key-value pair in our JSON object

## What happens when we submit our blogpost form?

* Submitting the blogpost form sends a `POST` request to `/create/post` as specified by the `action` and `method` attribute of the form
* The `POST` request takes the form of a readable stream which arrives in chunks
> Is there a property in the request object that describes whether a request is a stream or not?
* These readable chunks are appended onto a variable every time a new chunk arrives 
```
request.on("data", function (chunkOfData) {
      allTheData += chunkOfData;
    });
```
* When the request data chunks have been collated, aka `request.on("end"...`
* Run a function which:
    * Converts the `POST` data string into a more usable object using the `querystring` module
        * Turns `post=testing+post+34%25` into `{ post: 'testing post 34%' }`using `convertedData = querystring.parse(allTheData);`
    * Reads our file located at posts.JSON (which contains our current posts), the file will be returned as a buffer here
    > Why is it given as a buffer here?
    * Convert our buffer into a string, and then parse using JSON.parse to convert it to a JSON object `JSON.parse(file.toString())`
    * Add a new key-value pair to our posts JSON object, with the key being the current time, and the value being the `post` value of our convertedData object
        * `posts[Date.now()] = convertedData.post` takes the current time, adds it as a key and gives it the value of `testing post 34%`
        * See 'object assignment in javascript' tutorials as a reminder here if needed
    * We then use the fs writeFile method to write to the posts.JSON file on our machine
        * The writeFile method has three parameters:
            * The path, which is stated here by `path.join(__dirname, "./posts.json")`,
            * The string we wish to add, stated here by `JSON.stringify(posts)`
            * and a callback function to be ran once the writing has been completed.
        * We must stringify our posts JSON object, as the writeFile method takes strings as an argument
        * The callback function re-directs to the homepage after rewriting the posts.JSON file, triggering the `/main.css`,
`/script.js`,`img/logo1.png`,`/posts` and `img/logo2.png` requests once more
        * The `/posts` request in our `/script.js` request will then repopulate the `index.html` with the updated posts.JSON object which will show the new blogpost!
    
